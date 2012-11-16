(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["iu-Cans-CA"] = $.extend(true, {}, en, {
        name: "iu-Cans-CA",
        englishName: "Inuktitut (Syllabics, Canada)",
        nativeName: "ᐃᓄᒃᑎᑐᑦ (ᑲᓇᑕᒥ)",
        language: "iu-Cans",
        numberFormat: {
            groupSizes: [3,0],
            percent: {
                pattern: ["-n%","n%"],
                groupSizes: [3,0]
            },
            currencies: {'':{
                groupSizes: [3,0]
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["ᓈᑦᑏᖑᔭ","ᓇᒡᒐᔾᔭᐅ","ᐊᐃᑉᐱᖅ","ᐱᖓᑦᓯᖅ","ᓯᑕᒻᒥᖅ","ᑕᓪᓕᕐᒥᖅ","ᓯᕙᑖᕐᕕᒃ"],
                    namesAbbr: ["ᓈᑦᑏ","ᓇᒡᒐ","ᐊᐃᑉᐱ","ᐱᖓᑦᓯ","ᓯᑕ","ᑕᓪᓕ","ᓯᕙᑖᕐᕕᒃ"],
                    namesShort: ["ᓈ","ᓇ","ᐊ","ᐱ","ᓯ","ᑕ","ᓯ"]
                },
                months: {
                    names: ["ᔮᓐᓄᐊᕆ","ᕖᕝᕗᐊᕆ","ᒫᑦᓯ","ᐄᐳᕆ","ᒪᐃ","ᔫᓂ","ᔪᓚᐃ","ᐋᒡᒌᓯ","ᓯᑎᐱᕆ","ᐅᑐᐱᕆ","ᓄᕕᐱᕆ","ᑎᓯᐱᕆ",""],
                    namesAbbr: ["ᔮᓐᓄ","ᕖᕝᕗ","ᒫᑦᓯ","ᐄᐳᕆ","ᒪᐃ","ᔫᓂ","ᔪᓚᐃ","ᐋᒡᒌ","ᓯᑎᐱ","ᐅᑐᐱ","ᓄᕕᐱ","ᑎᓯᐱ",""]
                },
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd,MMMM dd,yyyy",
                    f: "dddd,MMMM dd,yyyy h:mm tt",
                    F: "dddd,MMMM dd,yyyy h:mm:ss tt",
                    Y: "MMMM,yyyy"
                }
            })
        }
    }, regions["iu-Cans-CA"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));