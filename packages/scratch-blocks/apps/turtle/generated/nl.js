// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">een visuele programmeeromgeving</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Bekijk de gemaakte JavaScriptcode.</span><span id="linkTooltip">Opslaan en koppelen naar blokken.</span><span id="runTooltip">Voer het programma uit dat met de blokken in de \\nwerkruimte is gemaakt. </span><span id="runProgram">Programma uitvoeren</span><span id="resetProgram">Opnieuw instellen</span><span id="dialogOk">OK</span><span id="dialogCancel">Annuleren</span><span id="catLogic">Logica</span><span id="catLoops">Lussen</span><span id="catMath">Formules</span><span id="catText">Tekst</span><span id="catLists">Lijsten</span><span id="catColour">Kleur</span><span id="catVariables">Variabelen</span><span id="catProcedures">Procedures</span><span id="httpRequestError">Er is een probleem opgetreden tijdens het verwerken van het verzoek.</span><span id="linkAlert">Deel uw blokken via deze koppeling:\n\n%1</span><span id="hashError">"%1" komt helaas niet overeen met een opgeslagen bestand.</span><span id="xmlError">Uw opgeslagen bestand kan niet geladen worden. Is het misschien gemaakt met een andere versie van Blockly?</span><span id="listVariable">lijst</span><span id="textVariable">tekst</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.codeDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.storageDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof turtlepage == 'undefined') { var turtlepage = {}; }


turtlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Turtle_moveTooltip">Verplaatst de schildpad vooruit of achteruit met \\nhet ingestelde aantal stappen. </span><span id="Turtle_moveForward">aantal vooruit</span><span id="Turtle_moveBackward">aantal achteruit</span><span id="Turtle_turnTooltip">Draait de schildpad naar link of naar rechts met \\nhet opgegeven aantal graden. </span><span id="Turtle_turnRight">rechts draaien,</span><span id="Turtle_turnLeft">links draaien</span><span id="Turtle_widthTooltip">Wijzigt de breedte van de pen. </span><span id="Turtle_setWidth">breedte instellen op</span><span id="Turtle_colourTooltip">Wijzigt de kleur van de pen.</span><span id="Turtle_setColour">kleur instellen op</span><span id="Turtle_penTooltip">Tilt de pen op of zet die neer, \\nom te stoppen of te beginnen met \\ntekenen. </span><span id="Turtle_penUp">pen omhoog</span><span id="Turtle_penDown">pen omlaag</span><span id="Turtle_turtleVisibilityTooltip">Maakt de schildpad zichtbaar of onzichtbaar \\n(cirkel en pijl). </span><span id="Turtle_hideTurtle">schildpad verbergen</span><span id="Turtle_showTurtle">Schildpad weergeven</span><span id="Turtle_printHelpUrl">http://nl.wikipedia.org/wiki/Boekdrukkunst</span><span id="Turtle_printTooltip">Tekent tekst in de richting van de schildpad \\nvanaf de huidige positie. </span><span id="Turtle_print">afdrukken</span><span id="Turtle_fontHelpUrl">http://nl.wikipedia.org/wiki/Lettertype</span><span id="Turtle_fontTooltip">Stelt het lettertype in voor tekst.</span><span id="Turtle_font">lettertype</span><span id="Turtle_fontSize">lettergrootte</span><span id="Turtle_fontNormal">normaal</span><span id="Turtle_fontBold">vet</span><span id="Turtle_fontItalic">cursief</span><span id="Turtle_unloadWarning">Als u deze pagina verlaat, gaat uw werk verloren.</span></div>';
};


turtlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return turtlepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Schildpadtekeningen</span></h1></td><td class="farSide"><select id="languageMenu"></select></td></tr></table><div id="visualization"><canvas id="scratch" width="400" height="400" style="display: none"></canvas><canvas id="display" width="400" height="400"></canvas></div><table style="padding-top: 1em;"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><script type="text/javascript" src="../slider.js"><\/script><svg id="slider" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="150" height="50"><!-- Slow icon. --><clipPath id="slowClipPath"><rect width=26 height=12 x=5 y=14 /></clipPath><image xlink:href="icons.png" height=42 width=84 x=-21 y=-10 clip-path="url(#slowClipPath)" /><!-- Fast icon. --><clipPath id="fastClipPath"><rect width=26 height=16 x=120 y=10 /></clipPath><image xlink:href="icons.png" height=42 width=84 x=120 y=-11 clip-path="url(#fastClipPath)" /></svg></td><td style="width: 15px;"><img id="spinner" style="visibility: hidden;" src="loading.gif" height=15 width=15></td><td style="width: 190px; text-align: center"><button id="runButton" class="primary" title="Laat de schildpad doen wat de blokken opdragen."><img src="../../media/1x1.gif" class="run icon21">Programma uitvoeren</button><button id="resetButton" class="primary" style="display: none"><img src="../../media/1x1.gif" class="stop icon21"> Opnieuw instellen</button></td></tr></table><div id="toolbarDiv"><button id="codeButton" class="notext" title="Bekijk de gemaakte JavaScriptcode."><img src=\'../../media/1x1.gif\' class="code icon21"></button><button id="linkButton" class="notext" title="Opslaan en koppelen naar blokken."><img src=\'../../media/1x1.gif\' class="link icon21"></button><button class="notext" id="captureButton" title="De tekening opslaan."><img src=\'../../media/1x1.gif\' class="img icon21"></button><a id="downloadImageLink" download="drawing.png"></a></div><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../blocks_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + turtlepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData);
};


turtlepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><category name="Schildpad"><block type="draw_move"><value name="VALUE"><block type="math_number"><title name="NUM">10</title></block></value></block><block type="draw_turn"><value name="VALUE"><block type="math_number"><title name="NUM">90</title></block></value></block><block type="draw_width"><value name="WIDTH"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="draw_pen"></block><block type="turtle_visibility"></block><block type="draw_print"><value name="TEXT"><block type="text"></block></value></block><block type="draw_font"></block></category><category name="Kleur"><block type="draw_colour"><value name="COLOUR"><block type="colour_picker"></block></value></block><block type="colour_picker"></block><block type="colour_random"></block><block type="colour_rgb"></block><block type="colour_blend"></block></category><category name="Logica"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block><block type="logic_ternary"></block></category><category name="Lussen"><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><title name="NUM">10</title></block></value></block><block type="controls_whileUntil"></block><block type="controls_for"><value name="FROM"><block type="math_number"><title name="NUM">1</title></block></value><value name="TO"><block type="math_number"><title name="NUM">10</title></block></value><value name="BY"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="controls_forEach"></block><block type="controls_flow_statements"></block></category><category name="Formules"><block type="math_number"></block><block type="math_arithmetic"></block><block type="math_single"></block><block type="math_trig"></block><block type="math_constant"></block><block type="math_number_property"></block><block type="math_change"><value name="DELTA"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="math_round"></block><block type="math_on_list"></block><block type="math_modulo"></block><block type="math_constrain"><value name="LOW"><block type="math_number"><title name="NUM">1</title></block></value><value name="HIGH"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="math_random_int"><value name="FROM"><block type="math_number"><title name="NUM">1</title></block></value><value name="TO"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="math_random_float"></block></category><category name="Lijsten"><block type="lists_create_empty"></block><block type="lists_create_with"></block><block type="lists_repeat"><value name="NUM"><block type="math_number"><title name="NUM">5</title></block></value></block><block type="lists_length"></block><block type="lists_isEmpty"></block><block type="lists_indexOf"><value name="VALUE"><block type="variables_get"><title name="VAR">lijst</title></block></value></block><block type="lists_getIndex"><value name="VALUE"><block type="variables_get"><title name="VAR">lijst</title></block></value></block><block type="lists_setIndex"><value name="LIST"><block type="variables_get"><title name="VAR">lijst</title></block></value></block><block type="lists_getSublist"><value name="LIST"><block type="variables_get"><title name="VAR">lijst</title></block></value></block></category><category name="Variabelen" custom="VARIABLE"></category><category name="Procedures" custom="PROCEDURE"></category></xml>';
};
