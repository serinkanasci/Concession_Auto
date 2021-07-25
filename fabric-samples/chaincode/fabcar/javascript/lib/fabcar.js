/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const admin = {user: 'admin', pwd: '123'}
        const number = {benefit: '0', sold: '0'}
        const cars = [
            {
                color: 'purple',
                make: 'Peugeot',
                model: '205',
                owner: 'Michel',
                price: '900000',
                arrival: '10/10/10',
                departure: '20/20/20',
                failure: '0',
                failureCost: '0',
                sold: '0',
            },
            {
                color: 'white',
                make: 'Chery',
                model: 'S22L',
                owner: 'Aarav',
                price: '100000',
                arrival: '10/10/10',
                departure: '20/20/20',
                failure: '0',
                failureCost: '0',
                sold: '0',
            },
        ];

        for (let i = 0; i < cars.length; i++) {
            cars[i].docType = 'car';
            await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(cars[i])));
            console.info('Added <--> ', cars[i]);
        }
        await ctx.stub.putState('ADMIN', Buffer.from(JSON.stringify(admin)));
        await ctx.stub.putState('NUMBER', Buffer.from(JSON.stringify(number)));
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    async createCar(ctx, carNumber, make, model, color, owner, price, arrival, departure, failure, failureCost) {
        console.info('============= START : Create Car ===========');

        const car = {
            color,
            docType: 'car',
            make,
            model,
            owner,
            price,
            arrival,
            departure,
            failure,
            failureCost,
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }

    async queryAllCars(ctx) {
        const startKey = 'CAR0';
        const endKey = 'CAR999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

    async changeCarPrice(ctx, carNumber, newPrice) {
        console.info('============= START : changeCarPrice ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.price = newPrice;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarPrice ===========');
    }

    async changeCarArrival(ctx, carNumber, newArrival) {
        console.info('============= START : changeCarArrival ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.arrival = newArrival;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarArrival ===========');
    }

    async changeCarDeparture(ctx, carNumber, newDeparture) {
        console.info('============= START : changeCarDeparture ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.departure = newDeparture;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarDeparture ===========');
    }

    async changeCarfailure(ctx, carNumber) {
        console.info('============= START : changeCarfailure ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.failure = '1';

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarfailure ===========');
    }

    async changeCarRepair(ctx, carNumber, newfailureCost) {
        console.info('============= START : changeCarRepair ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.failure = '0'
        const cost = parseInt(car.failureCost) + parseInt(newfailureCost)
        const costStr = cost.toString()
        car.failureCost = costStr

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarRepair ===========');
    }

    async soldCar(ctx, carNumber) {
        console.info('============= START : changeCarRepair ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }

        const car = JSON.parse(carAsBytes.toString());
        car.sold = '1';

        const numberAsBytes = await ctx.stub.getState('NUMBER');
        if (!numberAsBytes || numberAsBytes.length === 0) {
            throw new Error(`Number does not exist`);
        }

        const num = JSON.parse(numberAsBytes.toString());

        const solded = parseInt(car.price) + parseInt(num.sold)
        const soldedStr = solded.toString()
        num.sold = soldedStr

        const benef =  (parseInt(num.benefit) + parseInt(car.price)) - parseInt(car.failureCost)
        const benefStr = benef.toString()
        num.benefit = benefStr


        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarRepair ===========');
    }

    async getAdmin(ctx) {
        const adminAsBytes = await ctx.stub.getState('ADMIN'); // get the car from chaincode state
        if (!adminAsBytes || adminAsBytes.length === 0) {
            throw new Error(`Admin does not exist`);
        }
        console.log(adminAsBytes.toString());
        return adminAsBytes.toString();
    }

    async getNumber(ctx) {
        const numberAsBytes = await ctx.stub.getState('NUMBER'); // get the car from chaincode state
        if (!numberAsBytes || numberAsBytes.length === 0) {
            throw new Error(`Number does not exist`);
        }
        console.log(numberAsBytes.toString());
        return numberAsBytes.toString();
    }
}

module.exports = FabCar;
