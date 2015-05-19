// Generated by CoffeeScript 1.9.2
var AdvProgressBar, ProgressControl;

ProgressControl = {
  failed: [],
  progresses: [],
  handleUpdate: function() {},
  slowForward: function(name) {
    var p;
    p = this.getProgress(name);
    p.completed = p.completed + Math.floor(Math.random() * 20 * (p.target - p.completed) / 100);
    return this.handleUpdate();
  },
  add: function(name, target) {
    this.progresses.push({
      name: name,
      completed: 0,
      target: target || 80,
      forwarder: setInterval(this.slowForward.bind(this, name), 250)
    });
    this.handleUpdate();
    return {
      complete: this.complete.bind(ProgressControl, name),
      update: this.update.bind(ProgressControl, name),
      fail: this.fail.bind(ProgressControl, name)
    };
  },
  complete: function(name) {
    return this.update(name, 100);
  },
  update: function(name, percentage) {
    var p;
    p = this.getProgress(name);
    p.target = percentage;
    if (percentage >= 100) {
      p.completed = percentage;
      setTimeout((function(_this) {
        return function() {
          return _this.finish(name);
        };
      })(this), 3000);
    }
    return this.handleUpdate();
  },
  finish: function(name) {
    var i;
    i = this.progresses.map(function(p) {
      return p.name;
    }).indexOf(name);
    clearInterval(this.progresses[i].forwarder);
    if (i !== -1) {
      this.progresses.splice(i, 1);
    }
    return this.handleUpdate();
  },
  fail: function(name, msg) {
    this.finish(name);
    this.failed.push({
      name: name,
      message: msg
    });
    return this.handleUpdate();
  },
  removeFail: function(name) {
    var i;
    i = this.failed.map(function(p) {
      return p.name;
    }).indexOf(name);
    if (i !== -1) {
      this.failed.splice(i, 1);
    }
    return this.handleUpdate();
  },
  getProgress: function(name) {
    var j, len, p, ref;
    ref = this.progresses;
    for (j = 0, len = ref.length; j < len; j++) {
      p = ref[j];
      if (p.name === name) {
        return p;
      }
    }
  }
};

AdvProgressBar = React.createClass({
  getInitialState: function() {
    return {
      failed: ProgressControl.failed,
      progresses: ProgressControl.progresses
    };
  },
  handleUpdate: function() {
    return this.setState({
      failed: ProgressControl.failed,
      progresses: ProgressControl.progresses
    });
  },
  componentDidMount: function() {
    return ProgressControl.handleUpdate = this.handleUpdate;
  },
  componentWillUnmount: function() {
    return ProgressControl.handleUpdate = function() {};
  },
  render: function() {
    var f, failed, failedProgresses, failedWidthPx, fullwidth, j, len, p, progresses, ref, refName, subProgresses, text, width;
    ref = this.state, progresses = ref.progresses, failed = ref.failed;
    width = this.props.width;
    failedProgresses = [];
    failedWidthPx = 100;
    for (j = 0, len = failed.length; j < len; j++) {
      f = failed[j];
      failedProgresses.push(React.createElement("div", {
        "key": "C" + f.name,
        "className": "progressbar-progress progressbar-progress-failed",
        "style": {
          width: failedWidthPx + "px"
        },
        "title": f.message
      }, React.createElement("span", {
        "onClick": ProgressControl.removeFail.bind(ProgressControl, f.name)
      }, f.name)));
    }
    subProgresses = (function() {
      var k, len1, results;
      results = [];
      for (k = 0, len1 = progresses.length; k < len1; k++) {
        p = progresses[k];
        if (p.completed > 100) {
          p.completed = 100;
        }
        text = p.name + ": " + p.completed + "%";
        refName = "textContainer_" + p.name;
        fullwidth = refName in this.refs ? this.refs[refName].getDOMNode().offsetWidth : 0;
        results.push(React.createElement("div", {
          "key": p.name,
          "className": "progressbar-progress"
        }, React.createElement("div", {
          "className": "progressbar-progress-container",
          "ref": refName
        }, React.createElement("div", {
          "key": p.name,
          "className": (p.completed >= 100 ? "progressbar-progress-complete" : "progressbar-progress-bar"),
          "style": {
            width: p.completed + "%"
          }
        }, React.createElement("div", {
          "className": "progressbar-progress-text",
          "style": {
            width: fullwidth + "px"
          }
        }, text)), text)));
      }
      return results;
    }).call(this);
    return React.createElement("div", {
      "style": {
        width: width
      }
    }, React.createElement("div", {
      "className": "progressbar-container"
    }, React.createElement(React.addons.CSSTransitionGroup, {
      "transitionName": "progressbar-animate"
    }, failedProgresses, subProgresses)));
  }
});
