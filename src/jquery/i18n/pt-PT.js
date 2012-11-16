(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["pt-PT"] = $.extend(true, {}, en, {
        name: "pt-PT",
        englishName: "Portuguese (Portugal)",
        nativeName: "português (Portugal)",
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
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "€"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': "-",
                firstDay: 1,
                days: {
                    names: ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],
                    namesAbbr: ["dom","seg","ter","qua","qui","sex","sáb"],
                    namesShort: ["D","S","T","Q","Q","S","S"]
                },
                months: {
                    names: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",""],
                    namesAbbr: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez",""]
                },
                AM: null,
                PM: null,
                eras: [{"name":"d.C.","start":null,"offset":0}],
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "dddd, d' de 'MMMM' de 'yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dddd, d' de 'MMMM' de 'yyyy HH:mm",
                    F: "dddd, d' de 'MMMM' de 'yyyy HH:mm:ss",
                    M: "d/M",
                    Y: "MMMM' de 'yyyy",
                    l: "dd-MM-yyyy HH:mm",
                    L: "dd-MM-yyyy HH:mm:ss"
                }
            })
        }
    }, regions["pt-PT"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));