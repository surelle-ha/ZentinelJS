module.exports = function (app) {
	var Service = {
		name: "Test",
	};

	Service.Add = (Num1, Num2) => {
		return Num1 + Num2;
	};

	Service.Sub = (Num1, Num2) => {
		return Num1 - Num2;
	};

	Service.Mul = (Num1, Num2) => {
		return Num1 * Num2;
	};

	Service.Div = (Num1, Num2) => {
		return Num1 / Num2;
	};

	return Service;
};
