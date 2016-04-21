ace.define("ace/mode/howl_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var HowlHighlightRules = function() {
    var keywordMapper = this.createKeywordMapper({
        "constant.language.boolean": "true|false"
    }, "identifier");

    var identifierRe = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*\\b";

    this.$rules = {
      "start": [
        {
          token : "comment",
          regex : "^#.*$"
        },
        {
          token : ["constant.language", "text", "variable"],
          regex : "^(BASE)(\\s+)(.*)$"
        },
        {
          token : ["constant.language", "text", "variable", "keyword", "text", "variable"],
          regex : "^(PREFIX)(\\s+)([^:]+)(:)(\\s*)(.*)$"
        },
        {
          token : ["constant.language", "text", "variable", "keyword", "text", "variable"],
          regex : "^(LABEL)(\\s+)([^:]+)(:)(\\s*)(.*)$"
        },
        {
          token : ["constant.language", "text", "variable", "keyword", "text", "variable"],
          regex : "^(TYPE)(\\s+)([^:]+)(:)(\\s*)(.*)$"
        },
        {
          token : ["constant.language", "text", "variable"],
          regex : "^(GRAPH)(\\s+)(.*)$"
        },
        {
          token : "constant.language",
          regex : "^GRAPH\\s+$"
        },
        {
          token : ["keyword.operator", "text", "variable", "keyword", "text", "text"],
          regex : "^(>*)(\\s*)(.+?)(:>>)(\\s+)(.*)$"
        },
        {
          token : ["keyword.operator", "text", "variable", "keyword", "text", "variable"],
          regex : "(^>*)(\\s*)(.+?)(:>)(\\s+)(.*)$"
        },
        {
          token : ["keyword.operator", "text", "variable", "keyword", "text", "text", "keyword", "variable", "text"],
          regex : "^(>*)(\\s*)(.+?)(:)(\\s+)(.*?)(@)(\\w+)(\\s*)$"
        },
        {
          token : ["keyword.operator", "text", "variable", "keyword", "text", "text", "keyword", "variable"],
          regex : "^(>*)(\\s*)(.+?)(:)(\\s+)(.*?)(\\^\\^)(.*)$"
        },
        {
          token : ["keyword.operator", "text", "variable", "keyword", "text", "text"],
          regex : "^(>*)(\\s*)(.+?)(:)(\\s+)(.*)$"
        },
        {
          token : ["text", "keyword", "variable", "text"],
          regex : "^  (.*)(@)(\\w+)(\\s*)$"
        },
        {
          token : ["text", "keyword", "variable"],
          regex : "^  (.*)(\\^\\^)(.*)$"
        },
        {
          token : "text",
          regex : "^  (.*)$"
        },
        {
          token : "keyword",
          regex : "^.*$"
        }
      ]
    }

};

oop.inherits(HowlHighlightRules, TextHighlightRules);

exports.HowlHighlightRules = HowlHighlightRules;
});

ace.define("ace/mode/folding/ini",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function() {
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.foldingStartMarker = /^\s*\[([^\])]*)]\s*(?:$|[;#])/;

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var re = this.foldingStartMarker;
        var line = session.getLine(row);

        var m = line.match(re);

        if (!m) return;

        var startName = m[1] + ".";

        var startColumn = line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;

        while (++row < maxRow) {
            line = session.getLine(row);
            if (/^\s*$/.test(line))
                continue;
            m = line.match(re);
            if (m && m[1].lastIndexOf(startName, 0) !== 0)
                break;

            endRow = row;
        }

        if (endRow > startRow) {
            var endColumn = session.getLine(endRow).length;
            return new Range(startRow, startColumn, endRow, endColumn);
        }
    };

}).call(FoldMode.prototype);

});

ace.define("ace/mode/howl",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/howl_highlight_rules","ace/mode/folding/ini"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var HowlHighlightRules = require("./howl_highlight_rules").HowlHighlightRules;
var FoldMode = require("./folding/ini").FoldMode;

var Mode = function() {
    this.HighlightRules = HowlHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "#";
    this.$id = "ace/mode/howl";
}).call(Mode.prototype);

exports.Mode = Mode;
});
