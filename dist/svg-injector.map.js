{"version":3,"file":"./svg-injector.min.js","sources":["./svg-injector.js"],"names":["window","document","SVGInjector","options","instanceCounter","this","init","svgCache","injections","requestQueue","ranScripts","config","env","SVG_NS","XLINK_NS","DEFAULT_SPRITE_CLASS_NAME","DEFAULT_SPRITE_CLASS_ID_NAME","DEFAULT_FALLBACK_CLASS_NAMES","DEFAULT_REMOVESTYLES_CLASS_NAME","prototype","isLocal","location","protocol","hasSvgSupport","implementation","hasFeature","count","elements","evalScripts","pngFallback","onlyInjectVisiblePart","keepStylesClass","spriteClassName","spriteClassIdName","removeStylesClass","removeAllStyles","fallbackClassName","prefixStyleTags","spritesheetURL","prefixFragIdClass","forceFallbacks","replaceNoSVGClass","querySelector","writeDefaultClass","inject","onDoneCallback","eachCallback","undefined","length","elementsLoaded","ctx","forEach","call","element","injectElement","svg","el","onElementInjectedCallback","imgUrl","getAttribute","getSpriteIdFromClass","setAttribute","fallbackUrl","imgUrlSplitByFId","split","test","perElementFallback","pop","replace","isArray","setFallbackClassNames","isFunction","svgElemSetClassName","removeFallbackClassNames","indexOf","push","loadSvg","getEnv","symbolId","classNames","className","slice","curClassName","idx","fallbackClassNames","idxOfCurClass","curClassNames","curFallbackClassName","uniqueClasses","join","prefixIdReferences","suffix","def","attribute","newName","defs","attr","elem","definitions","querySelectorAll","g","defLen","id","usingElements","h","usingElementsLen","copyAttributes","svgElemSource","svgElemTarget","attributesToIgnore","curAttr","i","attributes","item","name","value","cloneSymbolAsSVG","svgSymbol","createElementNS","childNodes","child","appendChild","cloneNode","doPrefixStyleTags","styleTag","injectCount","srcArr","origPrefixClassName","regex","RegExp","newPrefixClassName","textContent","getClassList","svgToCheck","curClassAttr","classes","curClass","cloneSvg","sourceSvg","fragId","svgElem","newSVG","viewBox","viewBoxAttr","symbolAttributesToFind","curClassList","setViewboxOnNewSVG","symbolElem","getElementById","SVGSymbolElement","SVGViewElement","selector","Math","abs","parseInt","x","y","symobolList","SVGSVGElement","prop","removeAttribute","SVGUseElement","referencedSymbol","getAttributeNS","substr","fragIdClassName","queueRequest","fileName","callback","fragmentId","processRequestQueue","url","requestQueueElem","len","index","setTimeout","onLoadSVG","urlArr","XMLHttpRequest","httpRequest","onreadystatechange","readyState","status","responseXML","statusText","Document","documentElement","DOMParser","Function","xmlDoc","parser","parseFromString","responseText","e","getElementsByTagName","open","overrideMimeType","send","css","head","style","createElement","type","styleSheet","cssText","createTextNode","noSVGClassName","imgId","imgTitle","classMerge","concat","imgStyle","imgData","filter","at","dataAttr","presARAttr","script","scriptType","scripts","scriptsToEval","k","scriptsLen","innerText","removeChild","l","scriptsToEvalLen","styleTags","svgClassList","parentNode","replaceChild","list","hash","out","hasOwnProperty","unshift","obj","constructor","apply","Object","toString","newClassNames","curClasses","Array","fn","scope","TypeError","angular","module","provider","injectorOpts","set","opts","$get","factory","svgInjectorOptions","directive","svgInjectorFactory","restrict","link","exports","define","amd"],"mappings":"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"}