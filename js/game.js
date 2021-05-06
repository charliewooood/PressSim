function load() {
	location.replace("https://lvoz2.github.io/PressSim/#pressure_creation")
	window.kpafactor;
	variables()
	window.worker = new Worker("./worker.js");
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker
		.register("https://lvoz2.github.io/PressSim/worker.js")
		.then(serviceWorker => {
			console.log("Service Worker registered: ", serviceWorker);
		})
		.catch(error => {
			console.error("Error registering the Service Worker: ", error);
		});
	}
	setInterval(update, 10);
	checkAlertify()
	loadSave()
}
function loadSave() {
	save = localStorage.getItem('save');
	save = atob(save);
	save = parseInt(save);
	if (save == 2) {
		var pricePerHandfile = localStorage.getItem('pricePerHand');
		var pricePerKitfile = localStorage.getItem('pricePerKit');
		var pricePerAKitfile = localStorage.getItem('pricePerAKit');
		var pricePerSalespersonfile = localStorage.getItem('pricePerSalesperson');
		var pricePerManagerfile = localStorage.getItem('pricePerManager');
		var pricePerSalespersonrpfile = localStorage.getItem('pricePerSalesperson');
		var moneyfile = localStorage.getItem('money'); 
		var psifile = localStorage.getItem('psi'); 
		var handsfile = localStorage.getItem('hands'); 
		var psipersecfile = localStorage.getItem('psipersec');
		var handMultiplierfile = localStorage.getItem('handMultiplier'); 
		var researchpointcostfile = localStorage.getItem('researchpointcost'); 
		var researchpointsfile = localStorage.getItem('researchpoints'); 
		var moneycostfile = localStorage.getItem('moneycost'); 
		var salespersonfile = localStorage.getItem('salesperson'); 
		var salespersonMultiplierfile = localStorage.getItem('salespersonMultiplier');
		var kitsfile = localStorage.getItem('kits');
		var Akitsfile = localStorage.getItem('Akits');
		var Managersfile = localStorage.getItem('Managers');
		var kitsMultiplierfile = localStorage.getItem('kitsMultiplier');
		pricePerHandfile = atob(pricePerHandfile); 
		pricePerSalespersonfile = atob(pricePerSalespersonfile);
		pricePerManagerfile = atob(pricePerManagerfile);
		pricePerSalespersonrpfile = atob(pricePerSalespersonrpfile);
		pricePerKitfile = atob(pricePerKitfile); 
		pricePerAKitfile = atob(pricePerAKitfile); 
		moneyfile = atob(moneyfile); 
		psifile = atob(psifile); 
		handsfile = atob(handsfile); 
		psipersecfile = atob(psipersecfile); 
		handMultiplierfile = atob(handMultiplierfile); 
		researchpointcostfile = atob(researchpointcostfile); 
		researchpointsfile = atob(researchpointsfile); 
		moneycostfile = atob(moneycostfile); 
		salespersonfile = atob(salespersonfile); 
		salespersonMultiplierfile = atob(salespersonMultiplierfile);
		kitsfile = atob(kitsfile);
		Akitsfile = atob(Akitsfile);
		Managersfile = atob(Managersfile);
		kitsMultiplierfile = atob(kitsMultiplierfile);
		pricePerHand = parseInt(pricePerHandfile); 
		priceKitHand = parseInt(pricePerKitfile); 
		money = parseInt(moneyfile); 
		psi = parseInt(psifile); 
		hands = parseInt(handsfile); 
		psipersec = parseInt(psipersecfile); 
		handMultiplier = parseInt(handMultiplierfile); 
		researchpointcost = parseInt(researchpointcostfile); 
		researchpoints = parseInt(researchpointsfile); 
		moneycost = parseInt(moneycostfile); 
		salesperson = parseInt(salespersonfile); 
		salespersonMultiplier = parseInt(salespersonMultiplierfile);
		kits = parseInt(kitsfile);
		Akits = parseInt(Akitsfile);
		Managers = parseInt(Managersfile);
		kitsMultiplier = parseInt(kitsMultiplierfile);
	}
	if (save != 2) {
	}
	refresh()
	stopLoad()
}
function changeUnit() {
	window.unitGroup = document.getElementsByClassName("unit");
	window.unitValueGroup = document.getElementsByClassName("unitValue");
	window.unit = unitGroup[0].innerText;
	for (var i = 0; i < unitGroup.length; i++) {
		if (unit === "psi") {
			unitGroup[i].innerText = "kPa";
			kpafactor = 6.89475729;
			unitValueGroup[i].innerText = parseInt(unitValueGroup[i].innerText) * 6.89475729;
		}
		if (unit === "kPa") {
			unitGroup[i].innerText = "psi";
			kpafactor = 1;
			unitValueGroup[i].innerText = psi;
		}
	}
}
function stopLoad() {
	document.getElementById("load").innerHTML = '';
}
function gainPsi(psiToIncreaseBy) {
	psi = psi + psiToIncreaseBy;
	refresh()
}
function gainResearch(researchpointsToIncreaseBy) {
	if (psi < (researchpointsToIncreaseBy * researchpointcost)) {
		alertify.message("Sorry, but you don't have enough coins to purchase this item. Please generate more coins and try again.");
	}
	if (psi >= (researchpointsToIncreaseBy * researchpointcost)) {
		researchpoints = researchpoints + researchpointsToIncreaseBy;
		psi = psi - (researchpointsToIncreaseBy * researchpointcost);
		
	}
	refresh()
}
function gainCoins(coinsToIncreaseBy) {
	if (researchpoints < (coinsToIncreaseBy * moneycost)) {
		alertify.message("Sorry, but you don't have enough coins to purchase this item. Please generate more coins and try again.");
	}
	if (researchpoints >= (coinsToIncreaseBy * moneycost)) {
		money = money + coinsToIncreaseBy;
		researchpoints = researchpoints - (coinsToIncreaseBy * moneycost);
	}
	refresh()
}
function buyHands(handsToBuy) {
	if ((handsToBuy * pricePerHand) > money) {
		alertify.message("Sorry, but you don't have enough coins to purchase this item. Please generate more coins and try again.");
	}
	if ((handsToBuy * pricePerHand) <= money) {
		hands = hands + handsToBuy;
		money = money - (handsToBuy * pricePerHand);
	}
	refresh()
}
function buyKits(kitsToBuy) {
	if ((kitsToBuy * pricePerKit) > money) {
		alertify.message("Sorry, but you don't have enough coins to purchase this item. Please generate more coins and try again.");
	}
	if ((kitsToBuy * pricePerKit) <= money) {
		kits = kits + kitsToBuy;
		money = money - (kitsToBuy * pricePerKit);
	}
	refresh()
}

function buyAKits(aKitsToBuy) {
	if ((aKitsToBuy * pricePerAKit) > money) {
		alertify.message("Sorry, but you don't have enough coins to purchase this item. Please generate more coins and try again.");
	}
	if ((aKitsToBuy * pricePerAKit) <= money) {
		Akits = Akits + aKitsToBuy;
		money = money - (aKitsToBuy * pricePerAKit);
		
	}
	refresh()
}
function buyManager(managersToBuy) {
	if ((managersToBuy * pricePerManager) > money) {
		alertify.message("Sorry, but you don't have enough coins to purchase this item. Please generate more coins and try again.");
	}
	if ((managersToBuy * pricePerManager) <= money) {
		Managers = Managers + managersToBuy;
		money = money - (managersToBuy * pricePerManager);
		kits = kits - 5;
	}
	refresh()
}
function buySales(SalespersonToBuy) {
	if ((SalespersonToBuy * pricePerSalesperson) > money) {
		alertify.message("Sorry, but you don't have enough coins to purchase this item. Please generate more coins and try again.");
	}
	if ((SalespersonToBuy * pricePerSalesperson) <= money) {
		salesperson = salesperson + SalespersonToBuy;
		money = money - (SalespersonToBuy * pricePerSalesperson);
		researchpersec = (researchpersec - pricePerSalespersonrp); 
	}
	refresh()
}
function purgeSave() {
	localStorage.clear()
	load()
}
function refresh() {
	psipersec = hands * handMultiplier;
	researchpersec = kits + (Akits * AkitMultiplier) * kitMultiplier;
	psiValue.innerHTML = Math.floor(psi * kpafactor);
	psiPerSec.innerHTML = psipersec;
	researchValue.innerHTML = Math.floor(researchpoints);
	researchPerSec.innerHTML = researchpersec;
	coinspersec = (salesperson * salespersonMultiplier) + (Managers * ManagerMultiplier);
	coinsValue.innerHTML = Math.floor(money);
	coinsPerSec.innerHTML = coinspersec;
	updateSaveFile()
}
function update() {
	gainPsi(psipersec / 100)
	gainResearch(researchpersec / 100)
	gainCoins(coinspersec / 100)
}
function savetoLS(key, value) {
	var lssave = btoa(value);
	localStorage.setItem(key, lssave);
}
function updateSaveFile() {
	savetoLS('pricePerHand', pricePerHand);
	savetoLS('money', money);
	savetoLS('psi', psi);
	savetoLS('hands', hands);
	savetoLS('psipersec', psipersec);
	savetoLS('handMultiplier', handMultiplier);
	savetoLS('kits', kits);
	savetoLS('Akits', Akits); 
	savetoLS('Managers', Managers); 
	savetoLS('kitMultiplier', kitMultiplier);
	savetoLS('researchpointcost', researchpointcost);
	savetoLS('researchpoints', researchpoints);
	savetoLS('moneycost', moneycost);
	savetoLS('salesperson', salesperson);
	savetoLS('salespersonMultiplier', salespersonMultiplier);
	savetoLS('save', 2);
}
function checkAlertify() {
	if(!alertify.errorAlert){
	  //define a new errorAlert base on alert
	  alertify.dialog('errorAlert',function factory(){
	    return{
		    build:function(){
			var errorHeader = '<h2>PressSim</h2>';
			this.setHeader(errorHeader);
		    }
		}; 
	    },true,'alert');
	}
}
load()

