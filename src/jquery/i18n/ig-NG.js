(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["ig-NG"] = $.extend(true, {}, en, {
        name: "ig-NG",
        englishName: "Igbo (Nigeria)",
        nativeName: "Igbo (Nigeria)",
        language: "ig",
        numberFormat: {
            currencies: {'':{
                pattern: ["$-n","$ n"],
                symbol: "N"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["Aiku","Aje","Isegun","Ojo'ru","Ojo'bo","Eti","Abameta"],
                    namesAbbr: ["Aik","Aje","Ise","Ojo","Ojo","Eti","Aba"],
                    namesShort: ["A","A","I","O","O","E","A"]
                },
                months: {
                    names: ["Onwa mbu","Onwa ibua","Onwa ato","Onwa ano","Onwa ise","Onwa isi","Onwa asa","Onwa asato","Onwa itolu","Onwa iri","Onwa iri n'ofu","Onwa iri n'ibua",""],
                    namesAbbr: ["mbu.","ibu.","ato.","ano.","ise","isi","asa","asa.","ito.","iri.","n'of.","n'ib.",""]
                },
                AM: ["Ututu","ututu","UTUTU"],
                PM: ["Efifie","efifie","EFIFIE"],
                eras: [{"name":"AD","start":null,"offset":0}],
                patterns: {
                    d: "d/M/yyyy",
                    l: "d/M/yyyy h:mm tt",
                    L: "d/M/yyyy h:mm:ss tt"
                }
            })
        }
    }, regions["ig-NG"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));