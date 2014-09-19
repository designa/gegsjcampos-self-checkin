(function () {
   'use strict';

  SelfCheckin.Services.
    factory('dymoprinter',['$http',function($http) {
      var labelXml, printerName, label;
      $http.get('/labels/weekend.label').success(function(data, status, headers, config) {
        labelXml = data;
        label = dymo.label.framework.openLabelXml(labelXml);
        console.log('Label loaded');
      });

    // select printer to print on
    // for simplicity sake just use the first LabelWriter printer
    var printers = dymo.label.framework.getPrinters();
    if(printers.length == 0){
      console.log("No DYMO printers are installed. Install DYMO printers.");
    }

    for (var i = 0; i < printers.length; ++i){
        var printer = printers[i];
        if (printer.printerType == "LabelWriterPrinter")
        {
            printerName = printer.name;
            break;
        }
    }
    if(printerName == ""){
      console.log("No LabelWriter printers found. Install LabelWriter printer");
    }else{
      console.log("Impressora encontrada: " + printerName);
    }

    function whichType () {
      var type = window.prompt('Qual seu perfil? \n\n[1] BUSINESS \n[2] DESIGNER \n[3] DEVELOPER');

      if (type == 1) {
        return 'BUSINESS';
      } else if (type == 2) {
        return 'DESIGNER';
      } else if (type == 3) {
        return 'DEVELOPER';
      } else {
        return type;
      }
    }

    var dymoprinter = {
      print: function(name,type){
        var valid_types = /^(BUSINESS|DESIGNER|DEVELOPER|ORGANIZER|COACH|JUDGE)$/

        if (type.match(valid_types) == null) {
          type = whichType();
        }

        label.setObjectText("TEXT_1", name);
        label.setObjectText("TEXT_2", type);
        label.print(printerName);
      }
    };

  return dymoprinter;

  }]);
}());
