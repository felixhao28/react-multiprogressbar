// Generated by CoffeeScript 1.9.2
var App, progressCount;

progressCount = 0;

App = React.createClass({
  add1: function() {
    var p;
    p = ProgressControl.add("progress " + (progressCount++));
    return setTimeout(function() {
      return p.complete();
    }, 2000);
  },
  add2: function() {
    var p;
    p = ProgressControl.add("progress " + (progressCount++));
    return setTimeout(function() {
      return p.complete();
    }, 5000);
  },
  add3: function() {
    var p;
    p = ProgressControl.add("progress " + (progressCount++));
    return setTimeout(function() {
      return p.fail("a good explanation");
    }, 2000);
  },
  add4: function() {
    var p;
    p = ProgressControl.add("progress " + (progressCount++));
    return setTimeout(function() {
      return p.fail("another one");
    }, 5000);
  },
  add5: function() {
    var p;
    p = ProgressControl.add("progress " + (progressCount++), 20);
    return setTimeout(function() {
      p.update(50);
      return setTimeout(function() {
        p.update(55);
        return setTimeout(function() {
          return p.update(100);
        }, 6000);
      }, 2000);
    }, 2000);
  },
  render: function() {
    return React.createElement("div", null, React.createElement(AdvProgressBar, null), React.createElement("button", {
      "onClick": this.add1
    }, "Add (complete after 2s)"), React.createElement("button", {
      "onClick": this.add2
    }, "Add (complete after 5s)"), React.createElement("button", {
      "onClick": this.add3
    }, "Add (fail after 2s)"), React.createElement("button", {
      "onClick": this.add4
    }, "Add (fail after 5s)"), React.createElement("button", {
      "onClick": this.add5
    }, "Add (fine granularity control)"));
  }
});

React.render(React.createElement(App, null), document.getElementById("mycontainer"));
