var marker1_is_displayed ;
var marker2_is_displayed ;
var marker3_is_displayed ;
var marker1;
var marker2;
var marker3;


 window.onload = function() {
        init();
    }

function init() {
   initGMaps()
   	document.getElementById("zoom0").onclick = function() { 
        scaleChg(0);
    }
    document.getElementById("zoom1").onclick = function() { 
        scaleChg(1);
    }
    document.getElementById("zoom2").onclick = function() { 
        scaleChg(2);
    }
    document.getElementById("zoom3").onclick = function() { 
        scaleChg(3);
    }
    document.getElementById("zoom4").onclick = function() { 
        scaleChg(4);
    }
    document.getElementById("address_button").onclick = function() { 
        markByAddress();
    }
    document.getElementById("cb1").onclick = function() { 
        checkbox1clicked();
    }
    document.getElementById("cb2").onclick = function() { 
        checkbox2clicked();
    }
    
    MyIcon0 = new GIcon();
    MyIcon0.image = "./pic/iconm.png";
    MyIcon0.shadow = "./pic/iconm_s.png";
    MyIcon0.iconSize = new GSize(28, 24);
    MyIcon0.shadowSize = new GSize(32, 27);
    MyIcon0.iconAnchor = new GPoint(13,27);
    
    aMarker = new pAMarker();
    aMarker.click(null,new GLatLng(9.0109,38.7611));
    
    GEvent.addListener(map,"click",function(oLay, mPnt) {
        aMarker.click(oLay, mPnt);
    });
}


function initGMaps() {
    if (GBrowserIsCompatible()) {
        map = new GMap2(document.getElementById("map"));
        map.setCenter(new GLatLng(9.0109,38.7611), mapScaleTbl[mapScale]);
        map.addControl(new GScaleControl());
        map.addControl(new GMapTypeControl());
        map.addControl(new GLargeMapControl());
        map.addControl(new GOverviewMapControl(new GSize(128,128)));
        
		map.addMapType(G_NORMAL_MAP);
		map.addMapType(G_SATELLITE_3D_MAP);
		
		//BaseURL = "http://localhost/mash_05level1/";
		BaseURL = "http://www.ethiopiamap.sakura.ne.jp/";
		
        //var geoXml = new GGeoXml("http://www.ethiopiamap.sakura.ne.jp/kml/Minibus_Route_AA.kml"); 
        //map.addOverlay(geoXml); 
        //marker1 = new GGeoXml("http://www.ethiopiamap.sakura.ne.jp/kml/Minibus_Route_AA.kml"); 
        marker1 = new GGeoXml(BaseURL + "kmz/Minibus_Route_AA.kmz"); 
        map.addOverlay(marker1); 
        //marker2 = new GGeoXml("http://www.ethiopiamap.sakura.ne.jp/kml/embassy_location_AA.kml"); 
        marker2 = new GGeoXml(BaseURL +"kmz/Minibus_station_location_AA.kmz" ); 
        map.addOverlay(marker2); 
        //marker3 = new GGeoXml("http://www.ethiopiamap.sakura.ne.jp/kml/Minibus_station_location_AA.kml");
        marker3 = new GGeoXml(BaseURL +"kmz/embassy_location_AA.kmz");
        map.addOverlay(marker3); 
        marker4 = new GGeoXml(BaseURL +"kmz/Education_location_AA.kmz");
        map.addOverlay(marker4); 
        marker5 = new GGeoXml(BaseURL +"kmz/Hospital_location_AA.kmz");
        map.addOverlay(marker5); 
        marker6 = new GGeoXml(BaseURL +"kmz/Int_organaization_AA");
        map.addOverlay(marker6); 
        marker7 = new GGeoXml(BaseURL +"kmz/Public_inst_location_AA.kmz");
        map.addOverlay(marker7); 
        marker8 = new GGeoXml(BaseURL +"kmz/Religious_inst_location_AA.kmz");
        map.addOverlay(marker8); 
        marker9 = new GGeoXml(BaseURL +"kmz/Sightseeing_location_AA.kmz");
        map.addOverlay(marker9); 
        
        
        //marker1 = new GMarker(new GLatLng(36.02, 139.16));
        //marker2 = new GMarker(new GLatLng(36.03, 139.17));
        marker1_is_displayed = 1;
        marker2_is_displayed = 1;
        marker3_is_displayed = 1;
        marker4_is_displayed = 1;
        marker5_is_displayed = 1;
        marker6_is_displayed = 1;
        marker7_is_displayed = 1;
        marker8_is_displayed = 1;
        marker9_is_displayed = 1;
        
        
        

		//map.setMapType(G_SATELLITE_3D_MAP);
        
        }

}

   

var map;
    var mapScaleTbl = new Array(5,8,11,12,14);
    var mapScale = 0;
   

function scaleChg(tScale) {
    mapScale = tScale;
    map.setZoom(mapScaleTbl[mapScale]);
}

function pAMarker() {

    this.oMarkerSave = null;

    this.click = function(oLay, oPoint) {
        if (oLay == null) {
            if (this.oMarkerSave != null)
                map.removeOverlay(this.oMarkerSave);
            var infoObj = new Object();
            infoObj.icon = MyIcon0;
            infoObj.draggable = true;
            this.oMarkerSave = new GMarker(oPoint,infoObj);
            map.addOverlay(this.oMarkerSave);
            document.getElementById("latlng").innerHTML = oPoint.toUrlValue();
        }
    }

    this.clear = function() {
        map.removeOverlay(this.oMarkerSave);
    }

    this.getPoint = function() {
        return this.oMarkerSave.getPoint();
    }
}


 
function markByAddress() {
    var address = document.getElementById("address").value;
    var geocoder = new GClientGeocoder();
    geocoder.getLatLng(address,function(point) {
        if (!point) {
            alert(address + " が見つかりません");
        } else {
            map.setCenter(point);
            aMarker.click(null, point);
        }
    });
}

function checkbox1clicked() {
      if (marker1_is_displayed == 0) {
        map.addOverlay(marker1);
        marker1_is_displayed = 1;
      } else {
        map.removeOverlay(marker1);
        marker1_is_displayed = 0;
      }
    }

function checkbox2clicked() {
      if (marker2_is_displayed == 0) {
        map.addOverlay(marker2);
        marker2_is_displayed = 1;
      } else {
        map.removeOverlay(marker2);
        marker2_is_displayed = 0;
      }
    }

function checkbox3clicked() {
      if (marker3_is_displayed == 0) {
        map.addOverlay(marker3);
        marker3_is_displayed = 1;
      } else {
        map.removeOverlay(marker3);
        marker3_is_displayed = 0;
      }
}

function checkbox4clicked() {
      if (marker4_is_displayed == 0) {
        map.addOverlay(marker4);
        marker4_is_displayed = 1;
      } else {
        map.removeOverlay(marker4);
        marker4_is_displayed = 0;
      }
}

function checkbox5clicked() {
      if (marker5_is_displayed == 0) {
        map.addOverlay(marker5);
        marker5_is_displayed = 1;
      } else {
        map.removeOverlay(marker5);
        marker5_is_displayed = 0;
      }
}

function checkbox6clicked() {
      if (marker6_is_displayed == 0) {
        map.addOverlay(marker6);
        marker6_is_displayed = 1;
      } else {
        map.removeOverlay(marker6);
        marker6_is_displayed = 0;
      }
}

function checkbox7clicked() {
      if (marker7_is_displayed == 0) {
        map.addOverlay(marker7);
        marker7_is_displayed = 1;
      } else {
        map.removeOverlay(marker7);
        marker7_is_displayed = 0;
      }
}

function checkbox8clicked() {
      if (marker8_is_displayed == 0) {
        map.addOverlay(marker8);
        marker8_is_displayed = 1;
      } else {
        map.removeOverlay(marker8);
        marker8_is_displayed = 0;
      }
}

function checkbox9clicked() {
      if (marker9_is_displayed == 0) {
        map.addOverlay(marker9);
        marker9_is_displayed = 1;
      } else {
        map.removeOverlay(marker9);
        marker9_is_displayed = 0;
      }
}

function radio_map_clicked(){
	map.setMapType(G_NORMAL_MAP);
}
function radio_earth_clicked(){
	map.setMapType(G_SATELLITE_3D_MAP);
}
