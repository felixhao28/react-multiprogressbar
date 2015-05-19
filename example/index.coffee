progressCount = 0

App = React.createClass
    add1: ->
        p = ProgressControl.add("progress #{progressCount++}")
        setTimeout ->
            p.complete()
        , 2000

    add2: ->
        p = ProgressControl.add("progress #{progressCount++}")
        setTimeout ->
            p.complete()
        , 2000

    add3: ->
        p = ProgressControl.add("progress #{progressCount++}")
        setTimeout ->
            p.fail("a good explanation")
        , 2000

    add4: ->
        p = ProgressControl.add("progress #{progressCount++}")
        setTimeout ->
            p.fail("another one")
        , 2000

    add5: ->
        p = ProgressControl.add("progress #{progressCount++}", 20)
        setTimeout ->
            p.update(50)
            setTimeout ->
                p.update(55)
                setTimeout ->
                    p.update(100) # same as p.complete()
                , 6000
            , 2000
        , 2000

    render: ->
        <div>
            <AdvProgressBar/>
            <button onClick={@add1}>Add (complete after 2s)</button>
            <button onClick={@add2}>Add (complete after 5s)</button>
            <button onClick={@add3}>Add (fail after 2s)</button>
            <button onClick={@add4}>Add (fail after 5s)</button>
            <button onClick={@add5}>Add (fine granularity control)</button>
        </div>

React.render(<App />, document.getElementById("mycontainer"))