ProgressControl =
    failed: []
    progresses: []

    handleUpdate: ->

    slowForward: (name) ->
        p = @getProgress(name)
        p.completed = p.completed + Math.floor(Math.random() * 20 * (p.target - p.completed) / 100)
        @handleUpdate()

    add: (name, target) ->
        @progresses.push
            name: name
            completed: 0
            target: target or 80
            forwarder: setInterval(@slowForward.bind(this, name), 250)
        @handleUpdate()
        complete: @complete.bind(ProgressControl, name)
        update: @update.bind(ProgressControl, name)
        fail: @fail.bind(ProgressControl, name)

    complete: (name) ->
        @update(name, 100)

    update: (name, percentage) ->
        p = @getProgress(name)
        p.target = percentage
        if percentage >= 100
            p.completed = percentage
            setTimeout =>
                @finish(name)
            , 3000
        @handleUpdate()

    finish: (name) ->
        i = @progresses.map (p) -> p.name
            .indexOf name
        clearInterval @progresses[i].forwarder
        if i isnt -1
            @progresses.splice(i, 1)
        @handleUpdate()

    fail: (name, msg) ->
        @finish(name)
        @failed.push
            name: name
            message: msg
        @handleUpdate()

    removeFail: (name) ->
        i = @failed.map (p) -> p.name
            .indexOf name
        if i isnt -1
            @failed.splice(i, 1)
        @handleUpdate()

    getProgress: (name) ->
        for p in @progresses when p.name is name
            return p

AdvProgressBar = React.createClass
    getInitialState: ->
        failed: ProgressControl.failed
        progresses: ProgressControl.progresses

    handleUpdate: ->
        @setState
            failed: ProgressControl.failed
            progresses: ProgressControl.progresses

    componentDidMount: ->
        ProgressControl.handleUpdate = @handleUpdate

    componentWillUnmount: ->
        ProgressControl.handleUpdate = ->
  
    render: ->
        {progresses, failed} = @state
        {width} = @props

        failedProgresses = []
        failedWidthPx = 100
        for f in failed
            failedProgresses.push(
                    <div key={"C" + f.name} className="progressbar-progress progressbar-progress-failed" style={{width: "#{failedWidthPx}px"}} title={f.message}>
                        <span onClick={ProgressControl.removeFail.bind(ProgressControl, f.name)}>
                            {f.name}
                        </span>
                    </div>
                )

        subProgresses =
            for p in progresses
                if p.completed > 100
                    p.completed = 100
                text = "#{p.name}: #{p.completed}%"
                refName = "textContainer_#{p.name}"
                fullwidth =
                    if refName of @refs
                        @refs[refName].getDOMNode().offsetWidth
                    else
                        0
                <div key={p.name} className="progressbar-progress">
                    <div className="progressbar-progress-container" ref={refName}>
                        <div
                            key={p.name}
                            className={if p.completed >= 100 then "progressbar-progress-complete" else "progressbar-progress-bar"}
                            style={{width: "#{p.completed}%"}}
                        >
                            <div className="progressbar-progress-text" style={{width: "#{fullwidth}px"}}>{text}</div>
                        </div>
                        {text}
                    </div>
                </div>

        <div style={{width: width}}>
            <div className="progressbar-container" >
                <React.addons.CSSTransitionGroup transitionName="progressbar-animate">
                    {failedProgresses}
                    {subProgresses}
                </React.addons.CSSTransitionGroup>
            </div>
        </div>