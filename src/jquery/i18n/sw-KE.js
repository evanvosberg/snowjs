(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["sw-KE"] = $.extend(true, {}, en, {
        name: "sw-KE",
        englishName: "Kiswahili (Kenya)",
        nativeName: "Kiswahili (Kenya)",
        language: "sw",
        numberFormat: {
            currencies: {'':{
                symbol: "S"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["Jumapili","Jumatatu","Jumanne","Jumatano","Alhamisi","Ijumaa","Jumamosi"],
                    namesAbbr: ["Jumap.","Jumat.","Juman.","Jumat.","Alh.","Iju.","Jumam."],
                    namesShort: ["P","T","N","T","A","I","M"]
                },
                months: {
                    names: ["Januari","Februari","Machi","Aprili","Mei","Juni","Julai","Agosti","Septemba","Oktoba","Novemba","Decemba",""],
                    namesAbbr: ["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ago","Sep","Okt","Nov","Dec",""]
                }
            })
        }
    }, regions["sw-KE"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));