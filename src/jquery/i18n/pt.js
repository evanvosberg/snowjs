(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["pt"] = $.extend(true, {}, en, {
        name: "pt",
        englishName: "Portuguese",
        nativeName: "Português",
        language: "pt",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': ".",
                '.': ","
            },
            currencies: {'':{
                pattern: ["-$ n","$ n"],
                ',': ".",
                '.': ",",
                symbol: "R$"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],
                    namesAbbr: ["dom","seg","ter","qua","qui","sex","sáb"],
                    namesShort: ["D","S","T","Q","Q","S","S"]
                },
                months: {
                    names: ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro",""],
                    namesAbbr: ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez",""]
                },
                AM: null,
                PM: null,
                eras: [{"name":"d.C.","start":null,"offset":0}],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, d' de 'MMMM' de 'yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dddd, d' de 'MMMM' de 'yyyy HH:mm",
                    F: "dddd, d' de 'MMMM' de 'yyyy HH:mm:ss",
                    M: "dd' de 'MMMM",
                    Y: "MMMM' de 'yyyy",
                    l: "dd/MM/yyyy HH:mm",
                    L: "dd/MM/yyyy HH:mm:ss"
                }
            })
        }
    }, regions["pt"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));