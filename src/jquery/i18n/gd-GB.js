(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["gd-GB"] = $.extend(true, {}, en, {
        name: "gd-GB",
        englishName: "Scottish Gaelic (United Kingdom)",
        nativeName: "Gàidhlig (An Rìoghachd Aonaichte)",
        language: "gd",
        numberFormat: {
            currencies: {'':{
                pattern: ["-$n","$n"],
                symbol: "£"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                firstDay: 1,
                days: {
                    names: ["Didòmhnaich","Diluain","Dimàirt","Diciadain","Diardaoin","Dihaoine","Disathairne"],
                    namesAbbr: ["Dòm","Lua","Mài","Cia","Ard","Hao","Sat"],
                    namesShort: ["D","L","M","C","A","H","S"]
                },
                months: {
                    names: ["Am Faoilleach","An Gearran","Am Màrt","An Giblean","An Cèitean","An t-Ògmhios","An t-Iuchar","An Lùnastal","An t-Sultain","An Dàmhair","An t-Samhain","An Dùbhlachd",""],
                    namesAbbr: ["Fao","Gea","Màr","Gib","Cèi","Ògm","Iuc","Lùn","Sul","Dàm","Sam","Dùb",""]
                },
                AM: ["m","m","M"],
                PM: ["f","f","F"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dd MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dd MMMM yyyy HH:mm",
                    F: "dd MMMM yyyy HH:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy",
                    l: "dd/MM/yyyy HH:mm",
                    L: "dd/MM/yyyy HH:mm:ss"
                }
            })
        }
    }, regions["gd-GB"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));