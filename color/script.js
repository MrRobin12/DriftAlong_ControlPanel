$(document).ready(function() {    
    var redChannel = "0";
    var greenChannel = "255";
    var blueChannel = "0";

    var rgb = rgbToString(redChannel, greenChannel, blueChannel);
    var hsl = rgbToHsl(redChannel, greenChannel, blueChannel);
    var hslColor = hslToString(hsl);
    
    let root = document.documentElement;
    root.style.setProperty('--vehicle_color', hslColor);
    
    hsl[1] = 1;
    
    var hue_slider = document.getElementById("hue_slider");
    var hue_value = ((hsl[0] * 360) / 360) * 100;
    hue_slider.value = hue_value;
    
    var saturation_slider = document.getElementById("sat_slider");
    var saturation_value = (hsl[1] * 100);
    saturation_slider.value = saturation_value;
    
    var brightness_slider = document.getElementById("bright_slider");
    var brightness_value = (hsl[2] * 100);
    brightness_slider.value = brightness_value;
    
    UpdateText(redChannel, greenChannel, blueChannel);
});

function UpdateColor() {
    var hue_slider = document.getElementById("hue_slider");
    var hue_value = (hue_slider.value / 100) * 360;
    
    var saturation_slider = document.getElementById("sat_slider");
    var saturation_value = (saturation_slider.value);
    
    var brightness_slider = document.getElementById("bright_slider");
    var brightness_value = (brightness_slider.value);
    
    var rgb = jQuery('#COLOR').css("background-color");
    var color = seperateRGB(rgb);
    UpdateText(color[0], color[1], color[2]);
    
    let root = document.documentElement;
    
    var hsl = hslToString2((hue_value / 360), (saturation_value / 100), (brightness_value / 100));
    root.style.setProperty('--vehicle_color', hsl);
}

function seperateRGB(rgb) {
    return rgb.replace(/^(rgb|rgba)\(/,'').replace(/\)$/,'').replace(/\s/g,'').split(',');
}

function seperateHSL(hsl) {
    return hsl.replace("hsl", "").replace("%", "").replace("%", "").replace("(", "").replace(")", "").split(",");
}

function UpdateText(r, g, b) {
    var hexCode = rgbToHex(r, g, b);    
    var rgbCode = "rgb(" + r + ", " + g + ", " + b +")";
    
    document.getElementById("colorId").innerHTML = hexCode + "<br>" + rgbCode;
    
    var color = rgbToHsl(r, g, b);
    var lightness = color[2];
    var newLightness = Math.round((1 - lightness));
    
    var newColor = 'hsl(' + ((0.5) * 100) + ', ' + ((0.5) * 100) + '%' + ', ' + ((newLightness) * 100) + '%' + ')';
    
    document.getElementById("hue").innerHTML = "HUE: " + (Math.round(document.getElementById("hue_slider").value)) + "%";
    document.getElementById("sat").innerHTML = "SATURATION: " + (Math.round(document.getElementById("sat_slider").value)) + "%";
    document.getElementById("light").innerHTML = "LIGHTNESS: " + (Math.round(document.getElementById("bright_slider").value)) + "%";
    
    document.getElementById("colorId").style.color = newColor;
}

function hslToRGB(h, s, l) {
	var m1, m2, hue;
	var r, g, b
	s /=100;
	l /= 100;
	if (s == 0)
		r = g = b = (l * 255);
	else {
		if (l <= 0.5)
			m2 = l * (s + 1);
		else
			m2 = l + s - l * s;
		m1 = l * 2 - m2;
		hue = h / 360;
		r = HueToRgb(m1, m2, hue + 1/3);
		g = HueToRgb(m1, m2, hue);
		b = HueToRgb(m1, m2, hue - 1/3);
	}
	return {r: r, g: g, b: b};
}

function HueToRgb(m1, m2, hue) {
	var v;
	if (hue < 0)
		hue += 1;
	else if (hue > 1)
		hue -= 1;

	if (6 * hue < 1)
		v = m1 + (m2 - m1) * hue * 6;
	else if (2 * hue < 1)
		v = m2;
	else if (3 * hue < 2)
		v = m1 + (m2 - m1) * (2/3 - hue) * 6;
	else
		v = m1;

	return 255 * v;
}

function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, l ];
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    var rgb = b | (g << 8) | (r << 16);
    return '#' + (0x1000000 + rgb).toString(16).slice(1);
}

function rgbToString(r, g, b) {
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function hslToString(hsl) {
    return "hsl(" + (hsl[0] * 360) + ", " + (hsl[1] * 100) + "%" + ", " + (hsl[2] * 100 ) + "%" + ")";
}

function hslToString2(h, s, l) {
    return "hsl(" + (h * 360) + ", " + (s * 100) + "%" + ", " + (l * 100 ) + "%" + ")";
}

window.onload = function(){ 
    UpdateModal();
};

function UpdateSliders(hsl) {
    var hue_slider = document.getElementById("hue_slider");
    var hue_value = (hsl[0] / 360) * 100;
    hue_slider.value = hue_value;
    
    var saturation_slider = document.getElementById("sat_slider");
    var saturation_value = (hsl[1] / 100) * 100;
    saturation_slider.value = saturation_value;
    
    var brightness_slider = document.getElementById("bright_slider");
    var brightness_value = (hsl[2] / 100) * 100;
    brightness_slider.value = brightness_value;
}

function UpdateModal() {
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("COLOR");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
    
var redValue = document.getElementById("rNumber");
var greenValue = document.getElementById("gNumber");
var blueValue = document.getElementById("bNumber");
    
let root = document.documentElement;
var mainColor = "rgb(255, 255, 255)";
    
redValue.onchange = function() {
    
    if (redValue.value > 255)
        redValue.value = 255;
    
    if (redValue.value < 0)
        redValue.value = 0;
    
    var rgb = seperateRGB(mainColor);
    rgb[0] = redValue.value;
    rgb[1] = greenValue.value;
    rgb[2] = blueValue.value;
    
    var value = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    var result = "hsl" + "(" + (value[0] * 360) + ", " + (value[1] * 100) + "%" + ", " + (value[2] * 100) + "%" + ")";
    
    var hsl = seperateHSL(result);  
    UpdateSliders(hsl);
    
    UpdateText(rgb[0], rgb[1], rgb[2]);
    root.style.setProperty('--vehicle_color', result);
}

greenValue.onchange = function() {
    
    if (greenValue.value > 255)
        greenValue.value = 255;
    
    if (greenValue.value < 0)
        greenValue.value = 0;
    
    var rgb = seperateRGB(mainColor);
    rgb[0] = redValue.value;
    rgb[1] = greenValue.value;
    rgb[2] = blueValue.value;
    
    var value = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    var result = "hsl" + "(" + (value[0] * 360) + ", " + (value[1] * 100) + "%" + ", " + (value[2] * 100) + "%" + ")";
    
    var hsl = seperateHSL(result);  
    UpdateSliders(hsl);
    
    UpdateText(rgb[0], rgb[1], rgb[2]);
    root.style.setProperty('--vehicle_color', result);
}

blueValue.onchange = function() {
    
    if (blueValue.value > 255)
        blueValue.value = 255;
    
    if (blueValue.value < 0)
        blueValue.value = 0;
    
    var rgb = seperateRGB(mainColor);
    rgb[0] = redValue.value;
    rgb[1] = greenValue.value;
    rgb[2] = blueValue.value;
    
    var value = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    var result = "hsl" + "(" + (value[0] * 360) + ", " + (value[1] * 100) + "%" + ", " + (value[2] * 100) + "%" + ")";
    
    var hsl = seperateHSL(result);  
    UpdateSliders(hsl);
    
    UpdateText(rgb[0], rgb[1], rgb[2]);
    root.style.setProperty('--vehicle_color', result);
}

// When the user clicks the button, open the modal 
btn.onclick = function() {
    var hsl = getComputedStyle(document.documentElement).getPropertyValue('--vehicle_color');
    var newHSL = seperateHSL(hsl);
    var rgb = hslToRGB(newHSL[0], newHSL[1], newHSL[2]);
    
    modal.style.display = "block";   
    redValue.value = Math.round(rgb.r);
    greenValue.value = Math.round(rgb.g);
    blueValue.value = Math.round(rgb.b);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}

}