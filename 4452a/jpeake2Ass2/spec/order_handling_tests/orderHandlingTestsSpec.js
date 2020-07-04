var purchaseOrder = require('../../purchaseOrderF19.js')
var sinon = require('sinon');
require('jasmine-sinon');

describe('Purchase Order Test Suite', function () {
	describe('Equivalence Testing', function () {
		var clientAccount;
		var creditCheckMode;

		describe('AccountStatus(clientAccount)', function () {
			beforeEach(function () {
				clientAccount = { age: 0, balance: 0 }
			});

			describe('getAgeFactor(clientAccount)', function () {
				const ageFactorTests = [
					{ age: 5, output: 0 },
					{ age: 17, output: 5 },
					{ age: 25, output: 10 },
					{ age: 35, output: 20 },
					{ age: 57, output: 50 },
					{ age: 75, output: 20 },
					{ age: 120, output: 0 }
				];

				ageFactorTests.forEach(test => {
					it(`should have a output of ${test.output}, when age is ${test.age}`, function () {
						clientAccount.age = test.age;
						expect(purchaseOrder.getAgeFactor(clientAccount)).toEqual(test.output);
					});
				});
			});

			describe('getBalanceFactor(clientAccount)', function () {
				const balanceFactorTests = [
					{ balance: -5, output: 0 },
					{ balance: 50, output: 6 },
					{ balance: 250, output: 16 },
					{ balance: 750, output: 30 },
					{ balance: 2000, output: 70 },
					{ balance: 4000, output: 200 },
					{ balance: 6000, output: 0 }
				];

				balanceFactorTests.forEach(test => {
					it(`should have a output of ${test.output}, when balance is ${test.balance}`, function () {
						clientAccount.balance = test.balance;
						expect(purchaseOrder.getBalanceFactor(clientAccount)).toEqual(test.output);
					});
				});
			});

			/* change made to purchase order line 55 for these tests*/
			describe('accountFactor = ageFactor * balanceFactor', function () {
				const accountFactorTests = [
					{ age: 5, balance: 5, output: 'invalid' },
					{ age: 115, balance: 5, output: 'invalid' },

					{ age: 50, balance: -5, output: 'invalid' },
					{ age: 50, balance: 7500, output: 'invalid' },

					{ age: 17, balance: 50, output: 'adverse' },
					{ age: 17, balance: 250, output: 'adverse' },
					{ age: 17, balance: 750, output: 'acceptable' },
					{ age: 17, balance: 2000, output: 'acceptable' },
					{ age: 17, balance: 4000, output: 'excellent' },

					{ age: 25, balance: 50, output: 'adverse' },
					{ age: 25, balance: 250, output: 'acceptable' },
					{ age: 25, balance: 750, output: 'acceptable' },
					{ age: 25, balance: 2000, output: 'good' },
					{ age: 25, balance: 4000, output: 'excellent' },

					{ age: 35, balance: 50, output: 'acceptable' },
					{ age: 35, balance: 250, output: 'acceptable' },
					{ age: 35, balance: 750, output: 'good' },
					{ age: 35, balance: 2000, output: 'excellent' },
					{ age: 35, balance: 4000, output: 'excellent' },

					{ age: 50, balance: 50, output: 'acceptable' },
					{ age: 50, balance: 250, output: 'good' },
					{ age: 50, balance: 750, output: 'excellent' },
					{ age: 50, balance: 2000, output: 'excellent' },
					{ age: 50, balance: 4000, output: 'excellent' },

					{ age: 80, balance: 50, output: 'acceptable' },
					{ age: 80, balance: 250, output: 'acceptable' },
					{ age: 80, balance: 750, output: 'good' },
					{ age: 80, balance: 2000, output: 'excellent' },
					{ age: 80, balance: 4000, output: 'excellent' },
				];

				accountFactorTests.forEach(test => {
					it(`should have a output of ${test.output}, when balance: ${test.balance} age: ${test.age}`, function () {
						clientAccount.age = test.age;
						clientAccount.balance = test.balance;
						expect(purchaseOrder.accountStatus(clientAccount)).toEqual(test.output);
					});
				});
			});

		});

		/* change made to purchase order line 75-80 for these tests*/
		describe('creditStatus(clientAcount, creditCheckMode)', function () {
			beforeEach(function () {
				clientAccount = { creditScore: 0 }
				creditCheckMode = 'default'
			});

			const creditStatusTests = [
				{ creditScore: -5, creditCheckMode: 'default', output: 'invalid' },
				{ creditScore: -5, creditCheckMode: 'restricted', output: 'invalid' },
				{ creditScore: 25, creditCheckMode: 'default', output: 'adverse' },
				{ creditScore: 25, creditCheckMode: 'restricted', output: 'adverse' },
				{ creditScore: 90, creditCheckMode: 'default', output: 'good' },
				{ creditScore: 90, creditCheckMode: 'restricted', output: 'good' },
				{ creditScore: 150, creditCheckMode: 'default', output: 'invalid' },
				{ creditScore: 150, creditCheckMode: 'restricted', output: 'invalid' },
			];

			creditStatusTests.forEach(test => {
				it(`should have a output of ${test.output}, when creditCheckMode is ${test.creditCheckMode}, and score is ${test.creditScore}`, function () {
					clientAccount.creditScore = test.creditScore;
					creditCheckMode = test.creditCheckMode;
					expect(purchaseOrder.creditStatus(clientAccount, creditCheckMode)).toEqual(test.output);
				});
			});

		});

		/* change made to purchase order line 92-98 for these tests*/
		describe('productStatus(product,inventory,inventoryThreshold)', function () {

			beforeEach(function () {
			});

			const productStatusTests = [
				{ product: 'Test1', inventory: [{ name: "Test1", q: 0 }], inventoryThreshold: 0, output: 'soldout' },
				{ product: 'Test2', inventory: [{ name: "Test2", q: 250 }], inventoryThreshold: 500, output: 'limited' },
				{ product: 'Test3', inventory: [{ name: "Test3", q: 750 }], inventoryThreshold: 500, output: 'available' },
				{ product: 'Test4', inventory: [{ name: "Test4", q: -5 }], inventoryThreshold: 0, output: 'invalid' },
				{ product: 'Test5', inventory: [{ name: "Test5", q: 0 }], inventoryThreshold: -5, output: 'invalid' },
				{ product: 'Test6', inventory: [{ name: "Test6", q: 2000 }], inventoryThreshold: 0, output: 'invalid' },
				{ product: 'Test7', inventory: [{ name: "Test7", q: 0 }], inventoryThreshold: 2000, output: 'invalid' },
			];

			productStatusTests.forEach(test => {
				it(`should have a output of ${test.output}, when product is ${test.product}, and inventory threshold is ${test.inventoryThreshold}`, function () {
					expect(purchaseOrder.productStatus(test.product, test.inventory, test.inventoryThreshold)).toEqual(test.output);
				});
			});

		});

		describe('orderHandling(clientAccount,product,inventory,inventoryThreshold,creditCheckMode)', function () {

		});

	});

	describe('Boundary Testing', function () {
		var clientAccount;

		var creditCheckMode;

		var product;
		var inventory;
		var inventoryThreshold;

		describe('AccountStatus(clientAccount)', function () {
			beforeEach(function () {
				clientAccount = { age: 0, balance: 0 }
			});

			/* change made to purchase order line 4-19 for these tests*/
			describe('getAgeFactor(clientAccount)', function () {
				const ageFactorTests = [
					{ age: 14, output: 0 },
					{ age: 15, output: 5 },
					{ age: 16, output: 5 },
		
					{ age: 19, output: 5 },
					{ age: 20, output: 10 },
					{ age: 21, output: 10 },

					{ age: 29, output: 10 },
					{ age: 30, output: 20 },
					{ age: 31, output: 20 },

					{ age: 39, output: 20 },
					{ age: 40, output: 50 },
					{ age: 41, output: 50 },

					{ age: 64, output: 50 },
					{ age: 65, output: 20 },
					{ age: 66, output: 20 },

					{ age: 109, output: 20 },
					{ age: 110, output: 0 },
					{ age: 111, output: 0 }
				];

				ageFactorTests.forEach(test => {
					it(`should have a output of ${test.output}, when age is ${test.age}`, function () {
						clientAccount.age = test.age;
						expect(purchaseOrder.getAgeFactor(clientAccount)).toEqual(test.output);
					});
				});
			});

			/* change made to purchase order line 28 for these tests*/
			describe('getBalanceFactor(clientAccount)', function () {
				const balanceFactorTests = [
					{ balance: -1, output: 0 },
					{ balance: 0, output: 0 },
					{ balance: 1, output: 6 },
	
					{ balance: 99, output: 6 },
					{ balance: 100, output: 16 },
					{ balance: 101, output: 16 },
	
					{ balance: 499, output: 16 },
					{ balance: 500, output: 30 },
					{ balance: 501, output: 30 },
	
					{ balance: 999, output: 30 },
					{ balance: 1000, output: 70 },
					{ balance: 1001, output: 70 },
	
					{ balance: 2999, output: 70 },
					{ balance: 3000, output: 200 },
					{ balance: 3001, output: 200 },
	
					{ balance: 4999, output: 200 },
					{ balance: 5000, output: 0 },
					{ balance: 5001, output: 0 }
				];
	
				balanceFactorTests.forEach(test => {
					it(`should have a output of ${test.output}, when balance is ${test.balance}`, function () {
						clientAccount.balance = test.balance;
						expect(purchaseOrder.getBalanceFactor(clientAccount)).toEqual(test.output);
					});
				});
			});

			describe('accountFactor = ageFactor * balanceFactor', function () {

			});

		});

		describe('creditStatus(clientAcount, creditCheckMode)', function () {
			beforeEach(function () {
				clientAccount = { creditScore: 0 }
				creditCheckMode = 'default'
			});

			const creditStatusTests = [
				{ creditScore: -1, creditCheckMode: 'default', output: 'invalid' },
				{ creditScore: 0, creditCheckMode: 'default', output: 'adverse' },
				{ creditScore: 1, creditCheckMode: 'default', output: 'adverse' },
				{ creditScore: -1, creditCheckMode: 'restricted', output: 'invalid' },
				{ creditScore: 0, creditCheckMode: 'restricted', output: 'adverse' },
				{ creditScore: 1, creditCheckMode: 'restricted', output: 'adverse' },

				{ creditScore: 49, creditCheckMode: 'default', output: 'adverse' },
				{ creditScore: 50, creditCheckMode: 'default', output: 'adverse' },
				{ creditScore: 51, creditCheckMode: 'default', output: 'adverse' },
				{ creditScore: 49, creditCheckMode: 'restricted', output: 'adverse' },
				{ creditScore: 50, creditCheckMode: 'restricted', output: 'good' },
				{ creditScore: 51, creditCheckMode: 'restricted', output: 'good' },
	
				{ creditScore: 74, creditCheckMode: 'default', output: 'adverse' },
				{ creditScore: 75, creditCheckMode: 'default', output: 'good' },
				{ creditScore: 76, creditCheckMode: 'default', output: 'good' },
				{ creditScore: 74, creditCheckMode: 'restricted', output: 'good' },
				{ creditScore: 75, creditCheckMode: 'restricted', output: 'good' },
				{ creditScore: 76, creditCheckMode: 'restricted', output: 'good' },

				{ creditScore: 99, creditCheckMode: 'default', output: 'good' },
				{ creditScore: 100, creditCheckMode: 'default', output: 'good' },
				{ creditScore: 101, creditCheckMode: 'default', output: 'invalid' },
				{ creditScore: 99, creditCheckMode: 'restricted', output: 'good' },
				{ creditScore: 100, creditCheckMode: 'restricted', output: 'good' },
				{ creditScore: 101, creditCheckMode: 'restricted', output: 'invalid' },
			];

			creditStatusTests.forEach(test => {
				it(`should have a output of ${test.output}, when creditCheckMode is ${test.creditCheckMode}, and score is ${test.creditScore}`, function () {
					clientAccount.creditScore = test.creditScore;
					creditCheckMode = test.creditCheckMode;
					expect(purchaseOrder.creditStatus(clientAccount, creditCheckMode)).toEqual(test.output);
				});
			});

		});

		describe('productStatus(product,inventory,inventoryThreshold)', function () {
			beforeEach(function () {
				product = '';
				inventory = [];
				inventoryThreshold = 0;
			});

			const productStatusTests = [
				{ product: 'Test1', inventory: [{ name: "Test1", q: -1 }], inventoryThreshold: -1, output: 'invalid' },
				{ product: 'Test2', inventory: [{ name: "Test2", q: 0 }], inventoryThreshold: 0, output: 'soldout' },
				{ product: 'Test3', inventory: [{ name: "Test3", q: 1 }], inventoryThreshold: 1, output: 'available' },
				{ product: 'Test4', inventory: [{ name: "Test4", q: 999 }], inventoryThreshold: 999, output: 'available' },
				{ product: 'Test5', inventory: [{ name: "Test5", q: 1000 }], inventoryThreshold: 1000, output: 'available' },
				{ product: 'Test6', inventory: [{ name: "Test6", q: 1001 }], inventoryThreshold: 1001, output: 'invalid' },
			];

			productStatusTests.forEach(test => {
				it(`should have a output of ${test.output}, when product is ${test.product}, and inventory threshold is ${test.inventoryThreshold}`, function () {
					expect(purchaseOrder.productStatus(test.product, test.inventory, test.inventoryThreshold)).toEqual(test.output);
				});
			});

		});

		describe('orderHandling(clientAccount,product,inventory,inventoryThreshold,creditCheckMode)', function () {		
		});

	});

	describe('Decision Testing', function () {
		var clientAccount;

		var creditCheckMode;

		describe('AccountStatus(clientAccount)', function () {
		});

		describe('creditStatus(clientAcount, creditCheckMode)', function () {

		});

		describe('productStatus(product,inventory,inventoryThreshold)', function () {

		});

		describe('orderHandling(clientAccount,product,inventory,inventoryThreshold,creditCheckMode)', function () {	
			var clientAccount = { age: 0, balance: 0 }
			var product = 'order'
			var inventory = [{ name: "order", q: -1 }]
			var inventoryThreshold = 0;
			var creditCheckMode = 'default';
			
			var s1;
			var s2;
			var s3;
			

			beforeEach(function(){
				s1=sinon.stub(purchaseOrder,'accountStatus');
				s2=sinon.stub(purchaseOrder,'creditStatus');
				s3=sinon.stub(purchaseOrder,'productStatus');
				
			});

			afterEach(function(){
				s1.restore();
				s2.restore();
				s3.restore();
			});

			const orderHandlingTests = [
				{ account: 'excellent', credit: 'good', product: 'soldout', output: 'accepted' },
				{ account: 'excellent', credit: 'adverse', product: 'soldout', output: 'accepted' },
				{ account: 'excellent', credit: 'good', product: 'limited', output: 'accepted' },
				{ account: 'excellent', credit: 'adverse', product: 'limited', output: 'accepted' },
				{ account: 'excellent', credit: 'good', product: 'available', output: 'accepted' },
				{ account: 'excellent', credit: 'adverse', product: 'available', output: 'accepted' },

				{ account: 'good', credit: 'good', product: 'soldout', output: 'accepted' },
				{ account: 'good', credit: 'good', product: 'limited', output: 'accepted' },
				{ account: 'good', credit: 'good', product: 'available', output: 'accepted' },

				{ account: 'adverse', credit: 'good', product: 'available', output: 'accepted' },
				{ account: 'acceptable', credit: 'good', product: 'available', output: 'accepted' },

				{ account: 'acceptable', credit: 'good', product: 'limited', output: 'pending' },
				{ account: 'acceptable', credit: 'good', product: 'soldout', output: 'pending' },

				{ account: 'adverse', credit: 'good', product: 'limited', output: 'pending' },

				{ account: 'good', credit: 'adverse', product: 'soldout', output: 'underReview' },
				{ account: 'good', credit: 'adverse', product: 'limited', output: 'underReview' },
				{ account: 'good', credit: 'adverse', product: 'available', output: 'underReview' },

				{ account: 'acceptable', credit: 'adverse', product: 'available', output: 'underReview' },

				{ account: 'invalid', credit: 'good', product: 'soldout', output: 'rejected' },
				{ account: 'invalid', credit: 'adverse', product: 'soldout', output: 'rejected' },
				{ account: 'invalid', credit: 'good', product: 'limited', output: 'rejected' },
				{ account: 'invalid', credit: 'adverse', product: 'limited', output: 'rejected' },
				{ account: 'invalid', credit: 'good', product: 'available', output: 'rejected' },
				{ account: 'invalid', credit: 'adverse', product: 'available', output: 'rejected' },

				{ account: 'excellent', credit: 'invalid', product: 'soldout', output: 'rejected' },
				{ account: 'good', credit: 'invalid', product: 'soldout', output: 'rejected' },
				{ account: 'acceptable', credit: 'invalid', product: 'soldout', output: 'rejected' },
				{ account: 'adverse', credit: 'invalid', product: 'soldout', output: 'rejected' },
				{ account: 'excellent', credit: 'invalid', product: 'limited', output: 'rejected' },
				{ account: 'good', credit: 'invalid', product: 'limited', output: 'rejected' },
				{ account: 'acceptable', credit: 'invalid', product: 'limited', output: 'rejected' },
				{ account: 'adverse', credit: 'invalid', product: 'limited', output: 'rejected' },
				{ account: 'excellent', credit: 'invalid', product: 'available', output: 'rejected' },
				{ account: 'good', credit: 'invalid', product: 'available', output: 'rejected' },
				{ account: 'acceptable', credit: 'invalid', product: 'available', output: 'rejected' },
				{ account: 'adverse', credit: 'invalid', product: 'available', output: 'rejected' },

				{ account: 'excellent', credit: 'good', product: 'invalid', output: 'rejected' },
				{ account: 'good', credit: 'good', product: 'invalid', output: 'rejected' },
				{ account: 'acceptable', credit: 'good', product: 'invalid', output: 'rejected' },
				{ account: 'adverse', credit: 'good', product: 'invalid', output: 'rejected' },
				{ account: 'excellent', credit: 'adverse', product: 'invalid', output: 'rejected' },
				{ account: 'good', credit: 'adverse', product: 'invalid', output: 'rejected' },
				{ account: 'acceptable', credit: 'adverse', product: 'invalid', output: 'rejected' },
				{ account: 'adverse', credit: 'adverse', product: 'invalid', output: 'rejected' },

				{ account: 'acceptable', credit: 'adverse', product: 'soldout', output: 'rejected' },
				{ account: 'acceptable', credit: 'adverse', product: 'limited', output: 'rejected' },

				{ account: 'adverse', credit: 'good', product: 'soldout', output: 'rejected' },

				{ account: 'adverse', credit: 'adverse', product: 'soldout', output: 'rejected' },
				{ account: 'adverse', credit: 'adverse', product: 'limited', output: 'rejected' },
				{ account: 'adverse', credit: 'adverse', product: 'available', output: 'rejected' },
			];

			orderHandlingTests.forEach(test => {
				it(`should have a output of ${test.output}, when productStatus: ${test.product} creditStatus: ${test.credit} accountStatus: ${test.account}`, function () {
					s1.onCall(0).returns(test.account);
					s2.onCall(0).returns(test.credit);
					s3.onCall(0).returns(test.product);

					expect(purchaseOrder.orderHandling(clientAccount,product,inventory,inventoryThreshold,creditCheckMode)).toEqual(test.output)
				});
			});
		});

	});

});
