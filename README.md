react-multiprogressbar
=================

Progress bar in React.js which tracks multiple parallel progresses.

Demo: http://felixhao28.github.io/react-multiprogressbar/

![image](https://cloud.githubusercontent.com/assets/2417391/7717511/61acae88-fed5-11e4-8695-778f3ea6d3bd.png)

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
