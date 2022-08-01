function HuskyEZCreator() {
  //const nhn = useState();
  if (typeof window.nhn == "undefined") window.nhn = {};
  const nhn = {};

  /**
   * @fileOverview This file contains application creation helper function, which would load up an HTML(Skin) file and then execute a specified create function.
   * @name HuskyEZCreator.js
   */
  const EZCreator = new (function () {
    const nBlockerCount = 0;

    const createInIFrame = function (htOptions) {
      //if (arguments.length == 1) {
      const oAppRef = htOptions.oAppRef;
      const elPlaceHolder = htOptions.elPlaceHolder;
      const sSkinURI = htOptions.sSkinURI;
      const fCreator = htOptions.fCreator;
      const fOnAppLoad = htOptions.fOnAppLoad;
      const bUseBlocker = htOptions.bUseBlocker;
      const htParams = htOptions.htParams || null;
      /* }  else {
        // for backward compatibility only
       const oAppRef = arguments[0];
      const elPlaceHolder = arguments[1];
      const sSkinURI = arguments[2];
      const fCreator = arguments[3];
      const fOnAppLoad = arguments[4];
      const bUseBlocker = arguments[5];
      const htParams = arguments[6]; */
      //}

      if (bUseBlocker) nhn.EZCreator.showBlocker();

      const attachEvent = function (elNode, sEvent, fHandler) {
        if (elNode.addEventListener) {
          elNode.addEventListener(sEvent, fHandler, false);
        } else {
          elNode.attachEvent("on" + sEvent, fHandler);
        }
      };

      if (!elPlaceHolder) {
        alert("Placeholder is required!");
        return;
      }

      if (typeof elPlaceHolder != "object")
        elPlaceHolder = document.getElementById(elPlaceHolder);

      const elIFrame = createInIFrame("");
      const nEditorWidth = createInIFrame("");
      const nEditorHeight = createInIFrame("");

      try {
        elIFrame = document.createElement(
          "<IFRAME frameborder=0 scrolling=no>"
        );
      } catch (e) {
        elIFrame = document.createElement("IFRAME");
        elIFrame.setAttribute("frameborder", "0");
        elIFrame.setAttribute("scrolling", "no");
      }

      elIFrame.style.width = "1px";
      elIFrame.style.height = "1px";
      elPlaceHolder.parentNode.insertBefore(
        elIFrame,
        elPlaceHolder.nextSibling
      );

      attachEvent(elIFrame, "load", function () {
        fCreator =
          elIFrame.contentWindow[fCreator] ||
          elIFrame.contentWindow.createSEditor2;

        //			top.document.title = ((new Date())-window.STime);
        //			window.STime = new Date();

        try {
          nEditorWidth =
            elIFrame.contentWindow.document.body.scrollWidth || "500px";
          nEditorHeight =
            elIFrame.contentWindow.document.body.scrollHeight + 12;
          elIFrame.style.width = "100%";
          elIFrame.style.height = nEditorHeight + "px";
          elIFrame.contentWindow.document.body.style.margin = "0";
        } catch (e) {
          nhn.EZCreator.hideBlocker(true);
          elIFrame.style.border = "5px solid red";
          elIFrame.style.width = "500px";
          elIFrame.style.height = "500px";
          alert("Failed to access " + sSkinURI);
          return;
        }

        const oApp = fCreator(elPlaceHolder, htParams); // oEditor

        oApp.elPlaceHolder = elPlaceHolder;

        oAppRef[oAppRef.length] = oApp;
        if (!oAppRef.getById) oAppRef.getById = {};

        if (elPlaceHolder.id) oAppRef.getById[elPlaceHolder.id] = oApp;

        oApp.run({ fnOnAppReady: fOnAppLoad });

        //			top.document.title += ", "+((new Date())-window.STime);
        nhn.EZCreator.hideBlocker();
      });
      //		window.STime = new Date();
      elIFrame.src = sSkinURI;
      this.elIFrame = elIFrame;
    };

    this.showBlocker = function () {
      if (this.nBlockerCount < 1) {
        const elBlocker = document.createElement("DIV");
        elBlocker.style.position = "absolute";
        elBlocker.style.top = 0;
        elBlocker.style.left = 0;
        elBlocker.style.backgroundColor = "#FFFFFF";
        elBlocker.style.width = "100%";

        document.body.appendChild(elBlocker);

        nhn.EZCreator.elBlocker = elBlocker;
      }

      nhn.EZCreator.elBlocker.style.height =
        Math.max(document.body.scrollHeight, document.body.clientHeight) + "px";

      this.nBlockerCount++;
    };

    this.hideBlocker = function (bForce) {
      if (!bForce) {
        if (--this.nBlockerCount > 0) return;
      }

      this.nBlockerCount = 0;

      if (nhn.EZCreator.elBlocker)
        nhn.EZCreator.elBlocker.style.display = "none";
    };
  })();
}

export default HuskyEZCreator;
