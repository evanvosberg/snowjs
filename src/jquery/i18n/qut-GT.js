(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["qut-GT"] = $.extend(true, {}, en, {
        name: "qut-GT",
        englishName: "K'iche (Guatemala)",
        nativeName: "K'iche (Guatemala)",
        language: "qut",
        numberFormat: {
            currencies: {'':{
                symbol: "Q"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["juq'ij","kaq'ij","oxq'ij","kajq'ij","joq'ij","waqq'ij","wuqq'ij"],
                    namesAbbr: ["juq","kaq","oxq","kajq","joq","waqq","wuqq"],
                    namesShort: ["ju","ka","ox","ka","jo","wa","wu"]
                },
                months: {
                    names: ["nab'e ik'","ukab' ik'","rox ik'","ukaj ik'","uro' ik'","uwaq ik'","uwuq ik'","uwajxaq ik'","ub'elej ik'","ulaj ik'","ujulaj ik'","ukab'laj ik'",""],
                    namesAbbr: ["nab'e","ukab","rox","ukaj","uro","uwaq","uwuq","uwajxaq","ub'elej","ulaj","ujulaj","ukab'laj",""]
                },
                AM: ["a.m.","a.m.","A.M."],
                PM: ["p.m.","p.m.","P.M."],
                eras: [{"name":"d.C.","start":null,"offset":0}],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, dd' de 'MMMM' de 'yyyy",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
                    f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
                    F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
                    M: "dd MMMM",
                    Y: "MMMM' de 'yyyy",
                    l: "dd/MM/yyyy hh:mm tt",
                    L: "dd/MM/yyyy hh:mm:ss tt"
                }
            })
        }
    }, regions["qut-GT"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));