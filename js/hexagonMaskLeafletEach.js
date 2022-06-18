// Creating Hexagons and Leaflet map for the la Colmena Cimarrona Visualization. 


const hexSVG = {
    xSize: 300,
    ySize: 300,
    n: 4,
    contDiv:'elDiv',
    buffer: 0, //pixels between hexagons
    center:[18.1155, -65.446],
    leafMaps: [],
    divNames : ['d2022','d2021','d2019'], // array with the names of the divs which for example could be the date. No spaces allowed.
    leafTiles: ['https://cartocollective.blob.core.windows.net/vieques/agricultura/colmena/2022/marzo/{z}/{x}/{y}.png','https://cartocollective.blob.core.windows.net/vieques/agricultura/colmena/2021/{z}/{x}/{y}.png','https://cartocollective.blob.core.windows.net/vieques/agricultura/colmena/2019/{z}/{x}/{y}.png'], // array with the address to tiles or images 
    filterNames: [],// array with the the names for the filters if needed and allows spaces 
    zoom: 18,
    assignTilesToDivs : function(iDIV, iTile, i){
        this.leafMaps[i] = L.map(iDIV, { zoomControl: false , attributionControl: false,}).setView(this.center, this.zoom);
        L.tileLayer(iTile, {} ).addTo(this.leafMaps[i]);
                        },
    startLeafDiv: function(){
        for (i=0;i<this.divNames.length;i++){
            this.assignTilesToDivs(this.divNames[i], this.leafTiles[i], i)
        }    
        },
        joinAllLeafDiv: function(){ 
            for (var i=0; i < this.leafMaps.length; i++){
                for (var j=0; j<this.leafMaps.length;j++){
                    if (i == j) {continue;}
                    this.leafMaps[i].sync(this.leafMaps[j])
                }
            }
        },
    make(contDiv){
        let daDiv = undefined;
        if (contDiv == undefined) {contDiv = this.contDiv}
        daDiv = document.getElementById(contDiv);
        if (daDiv == undefined){alert(contDiv + " does not exist check div id")}
        const daHeight = daDiv.getBoundingClientRect().height; 
        const daWidth = daDiv.getBoundingClientRect().width;
        const xmlns = "http://www.w3.org/2000/svg";
        const svgParentElem = document.createElementNS(xmlns, "svg");
        svgParentElem.setAttributeNS(null, "id", "hexagon-parent");
        svgParentElem.setAttributeNS(null, "viewBox", "0 0 " + daWidth + " " + daHeight);
        

        const startX = this.buffer + Math.trunc(daWidth/2);
        const startY = Math.trunc(daHeight/(this.n/2));
        const hRadio = startX - this.buffer;
        const hDistance = hRadio * Math.sqrt(3) 
        const svgPath = document.createElementNS(xmlns, "path");
        const daMx = startX + hRadio;
        let d = 'M ' + daMx + ',' +startY;
            for (let h = 1; h <= 7; h++){
                const daX = startX + hRadio*Math.cos(Math.PI*h/3) 
                const daY = startY - hRadio*Math.sin(Math.PI*h/3) 
                const daL =  " L"+ daX +"," + daY
                d = d + daL
            }
            svgPath.setAttributeNS(null, "d", d);
            const svgClipPath = document.createElementNS(xmlns, "clipPath");
            svgClipPath.setAttributeNS(null, "id", 'mask_');
            svgClipPath.appendChild(svgPath)
            svgParentElem.appendChild(svgClipPath)
        
    
    // const divArray =  daDiv.getElementsByTagName('div')
    // const nDiv = divArray.length
    // for (let divI = 0; divI < nDiv; divI++) {
        daDiv.style.clipPath = "url(#mask_)"
        daDiv.style.webkitClipPath = "url(#mask_)"
        daDiv.style.zIndex = "999";


        daDiv.appendChild(svgParentElem)

    },

}


//                             document.getElementById(this.divNames[i]).appendChild(svgElem)
//                             document.getElementById(this.divNames[i]).style.clipPath = 'url(#mask_' + daID + ')';
//                             document.getElementById(this.divNames[i]).style.webkitClipPath  = 'url(#mask_' + daID + ')';
//                             document.getElementById(this.divNames[i]).style.zIndex = "999";
