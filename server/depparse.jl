const shift = 1
const reducel = 2
const reducer = 3

type State
    tokens::Vector
    step::Int
    top::Int
    left
    right::Int
    lcs::Vector{Int}
    rcs::Vector{Int}
    prev
    act::Int
end
State(tokens) = State(tokens, 1, 1, nothing, 2, Int[], Int[], nothing, 0)

isfinal(s::State) = s.step == ((length(s.tokens)-1) * 2 + 1)

function expand(s::State)
    isfinal(s) && return State[]
    acts = Int[]
    s.left == nothing || push!(acts, reducel, reducer)
    s.right <= length(s.tokens) && push!(acts, shift)
    a = acts[rand(1:length(acts))]
    State(s, a)
end

function State(s::State, act::Int)
    top, lcs, rcs, left, right = begin
        if act == shift
            s.right, Int[], Int[], s, s.right+1
        elseif act == reducel
            _lcs = length(s.lcs) == 0 ? [s.left.top] : [s.left.top,s.lcs[1]]
            s.top, _lcs, s.rcs, s.left.left, s.right
        elseif act == reducer
            _rcs = length(s.left.rcs) == 0 ? [s.top] : [s.top,s.left.rcs[1]]
            s.left.top, s.left.lcs, _rcs, s.left.left, s.right
        else
            throw("Invalid action: $(act)")
        end
    end
    State(s.tokens, s.step+1, top, left, right, lcs, rcs, s, act)
end

function depparse(tokens::Vector)
    state = State(tokens)
    while !isfinal(state)
        state = expand(state)
    end
    state
end

function toheads(s::State)
    heads = fill(0, length(s.tokens))
    while s != nothing
        length(s.lcs) > 0 && (heads[s.lcs[1]] = s.top)
        length(s.rcs) > 0 && (heads[s.rcs[1]] = s.top)
        s = s.prev
    end
    heads
end
