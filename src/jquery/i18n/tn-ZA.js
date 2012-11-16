(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["tn-ZA"] = $.extend(true, {}, en, {
        name: "tn-ZA",
        englishName: "Setswana (South Africa)",
        nativeName: "Setswana (Aforika Borwa)",
        language: "tn",
        numberFormat: {
            percent: {
                pattern: ["-%n","%n"]
            },
            currencies: {'':{
                pattern: ["$-n","$ n"],
                symbol: "R"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["Latshipi","Mosupologo","Labobedi","Laboraro","Labone","Labotlhano","Lamatlhatso"],
                    namesAbbr: ["Ltp.","Mos.","Lbd.","Lbr.","Lbn.","Lbt.","Lmt."],
                    namesShort: ["Lp","Ms","Lb","Lr","Ln","Lt","Lm"]
                },
                months: {
                    names: ["Ferikgong","Tlhakole","Mopitloe","Moranang","Motsheganong","Seetebosigo","Phukwi","Phatwe","Lwetse","Diphalane","Ngwanatsele","Sedimothole",""],
                    namesAbbr: ["Fer.","Tlhak.","Mop.","Mor.","Motsh.","Seet.","Phukw.","Phatw.","Lwets.","Diph.","Ngwan.","Sed.",""]
                },
                patterns: {
                    d: "yyyy/MM/dd",
                    D: "dd MMMM yyyy",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
                    f: "dd MMMM yyyy hh:mm tt",
                    F: "dd MMMM yyyy hh:mm:ss tt",
                    M: "dd MMMM",
                    Y: "MMMM yyyy",
                    l: "yyyy/MM/dd hh:mm tt",
                    L: "yyyy/MM/dd hh:mm:ss tt"
                }
            })
        }
    }, regions["tn-ZA"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));