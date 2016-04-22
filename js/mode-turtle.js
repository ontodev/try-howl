ace.define("ace/mode/turtle_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var TurtleHighlightRules = function() {
  this.$rules = {
    "start": [
      {
        token : "comment",
        regex : "^#.*$"
      },
      {
        token : "keyword",
        regex : "@prefix"
      },
      {
        token : "keyword",
        regex : "a"
      },
      {
        token : ["keyword", "variable", "keyword"],
        regex : "(<)(\\S+)(>)"
      },
      {
        token : "variable",
        regex : "\\S+:\\S*"
      },
      {
        token : ["keyword", "string", "keyword"],
        regex : '(")([^"]+)(")'
      },
      {
        token : ["keyword", "variable"],
        regex : "(@)(\\w+)"
      },
      {
        token : "keyword",
        regex : "\\^\\^"
      },
      {
        token : "keyword",
        regex : "\\.\\s*$"
      }
    ]
  }
};

oop.inherits(TurtleHighlightRules, TextHighlightRules);

exports.TurtleHighlightRules = TurtleHighlightRules;
});

ace.define("ace/mode/turtle",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/turtle_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var TurtleHighlightRules = require("./turtle_highlight_rules").TurtleHighlightRules;

var Mode = function() {
    this.HighlightRules = TurtleHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "#";
    this.$id = "ace/mode/turtle";
}).call(Mode.prototype);

exports.Mode = Mode;
});
