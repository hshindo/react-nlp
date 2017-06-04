using HttpServer
using WebSockets
using JSON

include("depparse.jl")

type Token
    i::Int
    j::Int
    label::String
end

function Token(i::Int, j::Int)
    h = i + j
    #id = Int(rem(h,length(posconf))) + 1
    #label = posconf[id][1]
    Token(i, j, "toklabel")
end

function readconf(path::String)
    lines = open(readlines, path)
    map(lines) do line
        items = split(chomp(line), '\t')
        (items[1], items[2])
    end
end

const filepath = dirname(@__FILE__)
const clients = Dict()
#const posconf = readconf("$(filepath)/pos.conf")
#const entityconf = readconf("$(filepath)/entity.conf")

function create_error(msg::String)
    dict = Dict(
        "error": msg,
    )
    JSON.json(dict)
end

wsh = WebSocketHandler() do req, client
    println("Client: $(client.id) is connected.")
    while true
        #println("Request from $(client.id) recieved.")
        msg = String(read(client))
        if length(msg) > 2000
            write(client, create_error("Error: the mssage length exceeds 2000."))
            continue
        end

        json = try
            JSON.parse(msg)
        catch
            write(client, create_error("Error: invalid json format: $(msg)"))
            continue
        end
        if !haskey(json, "text")
            write(client, create_error("Error: key: text does not exist. Check the JSON format."))
            continue
        end

        text = json["text"]
        doc = Vector{Token}[]
        lines = []
        line_s = 1
        #lines = split(text, '\n', keep=false)
        for i = 1:length(text)
            char = text[i]
            if char == '\n'
                push!(lines, [line_s,i])
                line_s = -1
            else
                line_s < 0 && (line_s = i)
            end
        end

        for sent in sents
            tokens = Token[]
            index = 1
            for i = 1:length(sent)
                c = sent[i]
                if c == ' '
                    index < i && push!(tokens, Token(index,i-1))
                    index = i + 1
                end
            end
            index <= length(sent) && push!(tokens, Token(index,length(sent)))
            length(tokens) > 0 && push!(doc, tokens)
        end

        sentences = []
        relations = []
        for i = 1:length(doc)
            tokens = doc[i]
            annos = []
            for t in tokens
                push!(annos, ["pos", t.i-1,t.j-1,t.label])
                if rem(t.i,4) == 0
                    #id = Int(rem(t.i,length(entityconf))) + 1
                    #label = entityconf[id][1]
                    label = "tlabel"
                    push!(annos, ["entity",t.i-1,t.j-1,label])
                end
            end

            heads = toheads(depparse(tokens))
            for k = 1:length(heads)
                h = heads[k]
                h == 0 && continue
                push!(relations, ["th",i-1,k-1,i-1,h-1,"rel_$(k-1)"])
            end

            push!(sentences, Dict("text"=>sents[i], "anno"=>annos))
        end
        res = JSON.json(Dict("sentences"=>sentences, "relations"=>relations))
        #println(res)
        write(client, res)
    end
end

onepage = readstring(joinpath(dirname(@__FILE__), "index.html"))
httph = HttpHandler() do req::Request, res::Response
    Response(onepage)
end
server = Server(httph, wsh)
run(server, 8081)
