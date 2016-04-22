ace.define("ace/mode/nquads_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var NquadsHighlightRules = function() {
  this.$rules = {
    "start": [
      {
        token : "comment",
        regex : "^#.*$"
      },
      {
        token : ["keyword", "variable", "keyword"],
        regex : "(<)(\\S+)(>)"
      },
      {
        token : "variable",
        regex : "_:\\w+"
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

oop.inherits(NquadsHighlightRules, TextHighlightRules);

exports.NquadsHighlightRules = NquadsHighlightRules;
});

ace.define("ace/mode/nquads",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/nquads_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var NquadsHighlightRules = require("./nquads_highlight_rules").NquadsHighlightRules;

var Mode = function() {
    this.HighlightRules = NquadsHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "#";
    this.$id = "ace/mode/nquads";
}).call(Mode.prototype);

exports.Mode = Mode;
});
