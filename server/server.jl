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
    #h = i + j
    #id = Int(rem(h,length(posconf))) + 1
    #label = posconf[id][1]
    Token(i, j, "label")
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

        # line
        lines = Vector{Int}[]
        start = 0
        for i = 1:length(text)
            char = text[i]
            if char == '\n'
                start > 0 && push!(lines,[start-1,i-2])
                start = 0
            else
                start == 0 && (start = i)
            end
        end
        start > 0 && push!(lines,[start-1,length(text)-1])

        # token
        spans = Dict()
        id = 1
        start = 0
        for i = 1:length(text)
            char = text[i]
            if char == ' ' || char == '\n'
                selecter = rand()
                label = selecter<0.5 ? "TK" : "SUPERLONGTOKEN"	
                color = selecter<0.5 ? "#84b62b" : "#FBFF5E"
                start > 0 && (spans["span-$id"] = [start-1,i-2,label,color])
                id += 1
                start = 0
            else
                start == 0 && (start = i)
            end
        end
        start > 0 && (spans["span-$id"] = [start-1,length(text)-1,"TK","#84b62b"])

        # relation
        spankeys = collect(keys(spans))
        rels = Dict()
        id = 1
        for i = 1:length(spans)/3
            ids = rand(1:length(spans), 2)
            rels["rel-$id"] = ["one-way", spankeys[ids[1]], spankeys[ids[2]], "label-$id", "#84b62b"]
            id += 1
        end

        res = Dict("line"=>lines, "span"=>spans, "relation" => rels)
        println(JSON.json(res))
        write(client, JSON.json(res))
    end
end

onepage = readstring(joinpath(dirname(@__FILE__), "index.html"))
httph = HttpHandler() do req::Request, res::Response
    Response(onepage)
end
server = Server(httph, wsh)
run(server, 3000)
