react-multiprogressbar
=================

Progress bar in React.js which tracks multiple parallel progresses.

Demo: http://felixhao28.github.io/react-multiprogressbar/

Usage
=====

```jsx
var component = React.createClass({
  componentDidMount: function() {
    taskA = ProgressControl.add("taskA");
    taskB = ProgressControl.add("taskB");
    setTimeout(function(){
            taskA.complete();
            taskB.fail("failure information");
        }, 2000);
  }

  render: function() {
    return (
        <AdvProgressBar/>
    );
  }
});
```
