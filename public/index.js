import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "regenerator-runtime/runtime.js";
import XLSX from "xlsx";

window.processData = (data) => {
  var OnFMReady = (function () {
    return class {
      static runFunction(t, ...r) {
        let n = setInterval(() => {
          "object" == typeof FileMaker &&
            (clearInterval(n), t.call(this, ...r));
        }, 100);
      }
      static runScript(t, r) {
        this.runFunction(() => {
          FileMaker.PerformScriptWithOption(t, r, 5);
        });
      }
      static run(...t) {
        "string" == typeof t[0]
          ? this.runScript(t[0], t[1])
          : this.runFunction(...t);
      }
    };
  })();

  var data = JSON.parse(data);

  var ws_name = "SheetJS";

  var wb = XLSX.utils.book_new();

  var ws = XLSX.utils.aoa_to_sheet(data, { cellDates: true });

  XLSX.utils.book_append_sheet(wb, ws, ws_name);

  OnFMReady.run(
    "Output",
    XLSX.write(wb, { bookType: "xlsx", bookSST: true, type: "base64" })
  );
};
