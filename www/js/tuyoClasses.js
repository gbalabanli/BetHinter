function inheritPrototype(childObject, parentObject) {
	var copyOfParent = Object.create(parentObject.prototype);
	childObject.prototype = copyOfParent;
	copyOfParent.constructor = childObject;
}	
/* ORNEKTIR INHERITANCE I GOSTERIR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
function Question(thistype,thisstatus){
	this.type = thistype;
	this.status = thisstatus;
}
function MultipleChoiceQuestion(thistype, thisstatus, thisnumber){
	 this.number = thisnumber;
	 Question.call(this, thistype, thisstatus);
	 inheritPrototype(MultipleChoiceQuestion, Question);
}
Question.prototype.display = function () {
	alert("merhaba bu question type"+this.type);
};
MultipleChoiceQuestion.prototype.display = function () {
	alert("bu multiple num"+this.number);
	alert("bu multiple type"+this.type);
};
/* ORNEKTIR INHERITANCE I GOSTERIR <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
function BetSlip(owner){
	this.owner      = owner;
	this.dateOfSlip = new Date();
	this.matches    = [];
    this.betslipMatchTimeStamps    = [];
	//this.betFactor  = betFactor;
	//this.TotalRatio =   
	//coinsGain
	//pointsGain
	//coinCost
	
	
}
function Match(matchID, matchCode, matchDate, matchTeams, leagueCode, ratio){
	this.matchID    = matchID;
	this.matchCode  = matchCode;
	this.matchDate  = matchDate;
	this.matchTeams = matchTeams;
	this.leagueCode = leagueCode;
	this.ratio      = ratio;

}
function DuelMatch(matchID, matchCode, matchDate, matchTeams, leagueCode, ratio, duelSide1 ,duelCode1, duelSide2, duelCode2 ){
	 this.duelSide1 = duelSide1;
	 this.duelCode1 = duelCode1;
	 this.duelSide2 = duelSide2;
	 this.duelCode2 = duelCode2;
	 Match.call(this, matchID, matchCode, matchDate, matchTeams, leagueCode, ratio);
	 inheritPrototype(DuelMatch, Match);
}
function Ratio(ratioType,ratioField,ratioRate,ratioMBS){
	this.ratioType  = ratioType;//9, 13...
	this.ratioField = ratioField;
	this.ratioRate  = ratioRate;
	this.ratioMBS   = ratioMBS;
	
}
function User(id,fname,lname,nickname,birthDate,sex,level,points,realMoney,virtualCoin){
	this.fname       = fname;
	this.lname       = lname;
	this.uid         = id;
	this.nickname    = nickname;
	this.birthDate   = birthDate;
	this.sex         = sex;
	this.level       = level;
	this.points      = points;
	this.realMoney   = realMoney;
	this.virtualCoin = virtualCoin;
	
}
