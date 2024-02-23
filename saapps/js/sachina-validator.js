"use strict";
var SACHINA = (function() {
    var usCurrencynPenny = function(obj, evt) {
        var id = obj.id;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode >= 37 && charCode <= 40) || charCode == 35 || charCode == 36) {
            return true;
        } else {
            if (charCode == 13) {
                return false;
            }
            $("#" + id).val(function(index, value) {
                value = value.replace(/,/g, '');
                return numberWithCommas(value);
            });
        }
    };
    var usCurrency = function(obj, evt) {
        var id = obj.id;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode >= 37 && charCode <= 40) || charCode == 35 || charCode == 36 || charCode == 46) {
            return true;
        } else {
            if (charCode == 13) {
                return false;
            }
            $("#" + id).val(function(index, value) {
                value = value.replace(/,/g, '');
                return numberWithCommas(value);
            });
        }

    };
    var isNumber = function(obj, evt) {
        var id = obj.id;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    };
    var isDecimalWithTwoPrecision = function(obj, evt) {
        var id = obj.id;
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46)
            return false;
        else if (charCode == 8)
            return true;
        else if (charCode == 37 || charCode == 39)
            return true;
        else {
            var val = $.trim($(obj).val());
            var len = val.length;
            var index = val.indexOf('.');
            if (charCode == 46 && len == 0) {
                return false;
            } else {
                if (len + 1 > 12 && index == -1 && charCode != 46) {
                    return false;
                }
                if (index > 0 && charCode == 46) {
                    return false;
                }
                if (index >= 0) {
                    var CharBeforeDot = obj.value.substring(0, index);
                    var CharAfterdot = obj.value.substring(index + 1);
                    if ((CharAfterdot.length == 2) && (index < $("#" + id).prop('selectionStart'))) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    var convertDigits = function(obj, evt) {
        var id = obj.id;
        var val = $("#" + id).val();
        if (val != "") {
            val = parseFloat(val.replace(/,/g, '')).toString();

            if (val.indexOf(".") > parseInt(-1)) {
                var index = val.indexOf('.');
                var afterDot = val.substring(index + 1);

                if (afterDot.length == 0) {
                    val = val + "00";
                } else if (afterDot.length == 1) {
                    val = val + "0";
                }
            } else {
                val = val + ".00";
            }

            val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            $("#" + id).val(val);
        }
    };
    var isAlphabets = (function(obj, evt) {
        var id = obj.id;
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (!(charCode >= 65 && charCode <= 120) && (charCode != 32 && charCode != 0)) {
            return false;
        } else if (charCode == 94 || charCode == 95) {
            return false;
        } else {
            return true;
        }
    });
    var isAlphabetsWithQuotes = (function(obj, evt) {
        var id = obj.id;
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (!(charCode >= 65 && charCode <= 120) && (charCode != 32 && charCode != 0) && (charCode != 34 && charCode != 39)) {
            return false;
        } else if (charCode == 94 || charCode == 95) {
            return false;
        } else {
            return true;
        }
    });
    var numberWithCommas = (function(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    });
    var isValidEmailAddress = (function(email) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(email);
    });
    var isValidPhoneNumber = (function(phone) {
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return phoneno.test(phone);
    });
    var usFormatPhoneNumber = (function(obj, evt) {
        var id = obj.id;
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if ((charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90) || charCode == 34 || charCode == 39) {
            return false;
        }
        if (charCode < 48 || (charCode > 57 && charCode < 65) || (charCode > 90 && charCode < 97) || charCode > 122) {
            return false;
        }
        var pos = doGetCaretPosition(obj);
        if (pos < 3 || (pos > 3 && pos < 7) || pos > 7) {
            if (charCode == 45) {
                return false;
            }
        }
        if (pos == 3 || pos == 7) {
            if (charCode == 45) {
                return true;
            }
            if (charCode != 45) {
                var value = $("#" + id).val();
                value = value + "-";
                $("#" + id).val(value);
            }
        }
    });
    var usSSN = (function(obj, evt) {
        var id = obj.id;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode == 8 || charCode == 37 || charCode == 39 || charCode == 9) && (String.fromCharCode(evt.which) != "%")) {
            return true;
        }
        if ((charCode == 46 && (String.fromCharCode(evt.which) != "."))) {
            return true;
        }
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        if (charCode == 34 || charCode == 39) {
            return false;
        }
        var pos = doGetCaretPosition(obj);
        if (pos < 3 || (pos > 3 && pos < 6) || pos > 6) {
            if (charCode == 45) {
                return false;
            }
        }
        if (pos == 3 || pos == 6) {
            if (charCode == 45) {
                return true;
            }
            if (charCode != 45) {
                var valSSN = $("#" + id).val();
                valSSN = valSSN + "-";
                $("#" + id).val(valSSN);

            }
        }
        return true;
    });
    var doGetCaretPosition = (function(ctrl) {
        var CaretPos = 0; // IE Support	
        if (document.selection) {
            ctrl.focus();
            var Sel = document.selection.createRange();
            Sel.moveStart('character', -ctrl.value.length);
            CaretPos = Sel.text.length;
        }
        // Firefox support	
        else if (ctrl.selectionStart || ctrl.selectionStart == '0')
            CaretPos = ctrl.selectionStart;
        return (CaretPos);
    });
    return {
        usCurrency: usCurrency,
        usCurrencynPenny: usCurrencynPenny,
        usFormatPhoneNumber: usFormatPhoneNumber,
        usSSN: usSSN,
        isNumber: isNumber,
        isAlphabets: isAlphabets,
        isValidEmailAddress: isValidEmailAddress,
        isValidPhoneNumber: isValidPhoneNumber,
        isAlphabetsWithQuotes: isAlphabetsWithQuotes,
        isDecimalWithTwoPrecision: isDecimalWithTwoPrecision,
        convertDigits: convertDigits
    };
}());