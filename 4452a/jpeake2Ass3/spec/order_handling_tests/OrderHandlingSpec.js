var purchaseOrder = require('../../purchase2OrderF19.js')
var sinon = require('sinon');
require('jasmine-sinon');

describe('Order Handling Tests', function () {
	describe('Question 3', function () {
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
		describe('Statement coverage Tests', function () {
			const orderHandlingTests = [
				//First - A - B (True) - Last
				{ account: 'invalid', credit: 'good', product: 'soldout', output: 'rejected' },
				
				// First - A - B (False) - C (True) - Last
				{ account: 'excellent', credit: 'good', product: 'soldout', output: 'accepted' },
				
				// First - A - B (False) - C (False) - D (True) - Last
				{ account: 'acceptable', credit: 'adverse', product: 'available', output: 'underReview' },
				
				// First - A - B (False) - C (False) - D (False) - E (True) - Last
				{ account: 'adverse', credit: 'good', product: 'limited', output: 'pending' }
			];
	
			orderHandlingTests.forEach(test => {
				it(`should have a output of ${test.output}, when productStatus: ${test.product} creditStatus: ${test.credit} accountStatus: ${test.account}`, function () {
					s1.onCall(0).returns(test.account);
					s2.onCall(0).returns(test.credit);
					s3.onCall(0).returns(test.product);
	
					expect(purchaseOrder.orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)).toEqual(test.output)
				});
			});
		});
	
		describe('Branch coverage Tests', function () {
			const orderHandlingTests = [
				// First - A - B (False) - C (True) - Last:
				{ account: 'acceptable', credit: 'good', product: 'available', output: 'accepted' },

				// First - A - B (False) - C (False) - D (True) - Last
				{ account: 'good', credit: 'adverse', product: 'soldout', output: 'underReview' },

				// First - A - B (False) - C (False) - D (False) - E (True) - Last
				{ account: 'acceptable', credit: 'good', product: 'limited', output: 'pending' },

			];
	
			orderHandlingTests.forEach(test => {
				it(`should have a output of ${test.output}, when productStatus: ${test.product} creditStatus: ${test.credit} accountStatus: ${test.account}`, function () {
					s1.onCall(0).returns(test.account);
					s2.onCall(0).returns(test.credit);
					s3.onCall(0).returns(test.product);
	
					expect(purchaseOrder.orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)).toEqual(test.output)
				});
			});
		});
	
		describe('Path coverage Tests', function () {
			const orderHandlingTests = [
				// First - A - B (False) - C (False) - D (False) - E (False) - Last
				{ account: '', credit: '', product: '', output: undefined }
			];
	
			orderHandlingTests.forEach(test => {
				it(`should have a output of ${test.output}, when productStatus: ${test.product} creditStatus: ${test.credit} accountStatus: ${test.account}`, function () {
					s1.onCall(0).returns(test.account);
					s2.onCall(0).returns(test.credit);
					s3.onCall(0).returns(test.product);
	
					expect(purchaseOrder.orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)).toEqual(test.output)
				});
			});
		});
	});

	describe('Question 5', function () {
		describe('Integration Tests', function () {
			const orderHandlingTests = [
				// tests needed to satisfy file on owl mm paths
				{ CA: { age: 0, balance: 0, creditScore: 0}, creditCheckMode: "default", product: 'Test1', inventory: [{ name: "Test1", q: 0 }], inventoryThreshold: 0, output: 'rejected' },
				{ CA: { age: 19, balance: 99, creditScore: 74}, creditCheckMode: "default", product: 'Test2', inventory: [{ name: "Test2", q: 250 }], inventoryThreshold: 500, output: 'rejected'  },
				{ CA: { age: 29, balance: 499, creditScore: 76}, creditCheckMode: "default", product: 'Test3', inventory: [{ name: "Test3", q: 750 }], inventoryThreshold: 500, output: 'accepted' },
				{ CA: { age: 39, balance: 999, creditScore: 49}, creditCheckMode: "restricted", product: 'Test7', inventory: [{ name: "Test7", q: 0 }], inventoryThreshold: 2000, output: 'rejected' },
				{ CA: { age: 64, balance: 2999, creditScore: 51}, creditCheckMode: "restricted", product: 'Test7', inventory: [{ name: "Test8", q: 0 }], inventoryThreshold: 2000, output: 'rejected' },		
				{ CA: { age: 109, balance: 4999, creditScore: 0}, creditCheckMode: "restricted", product: 'Test7', inventory: [{ name: "Test8", q: 0 }], inventoryThreshold: 2000, output: 'rejected' },

				// extra mm path tests due to the changes to fix the file assingment 2
				{ CA: { age: 109, balance: 4999, creditScore: -1}, creditCheckMode: "restricted", product: 'Test7', inventory: undefined, inventoryThreshold: 2000, output: 'rejected' },

				// extra mm tests due to the else mentioned in the report
				{ CA: { age: 109, balance: 4999, creditScore: 0}, creditCheckMode: undefined, product: 'Test7', inventory: [{ name: "Test8", q: 0 }], inventoryThreshold: 2000, output: 'rejected' },
			];
	
			orderHandlingTests.forEach(test => {
				it(`should have a output of ${test.output}`, function () {
					expect(purchaseOrder.orderHandling(test.CA, test.product, test.inventory, test.inventoryThreshold, test.creditCheckMode)).toEqual(test.output)
				});
			});
		});
	});
});