/** 
 * REST API Functional Testing for Pet Clinic. 
    
   @author Breandan McClure 
   @version 1.0 
*/ 
 
var api = require('unirest'); 
require('jest'); 
require('jest-extended'); 
var log4js = require('log4js'); 
 
const urlExample = "http://example.com/";
const proxy = "http://199.169.118.16:8080"
 
var log = log4js.getLogger(); 
log.level = ''; // debug/trace/info/error/warn 

 
 
/** 
 ****************************************************************************************************** 
 * The actual REST API Tests against the endpoint. 
 ****************************************************************************************************** 
 */ 
 
 
 
function beforeTest(explanation) { 
    process.stdout.write('\n' + 'test() : ' + explanation + ' : ' + '\n');   
} 
 
const beforeExpect = (explanation, fn) => { 
    explanation = "    expect() : " + explanation + '\n'; 
    try { 
        fn(); 
        process.stdout.write(explanation) 
    } catch(e) { 
        e.message = explanation + e.message; 
        throw e; 
    } 
}; 
  
describe('Suite: API Smoke test for Pet Clinic App', () => { 
    beforeAll(() => { 
        process.stdout.write('\n'); 
        process.stdout.write('-'.repeat(100) + '\n'); 
        process.stdout.write('Test Case Breakdown' + '\n'); 
        process.stdout.write('-'.repeat(100) + '\n'); 
    }); 
 
    describe('Test:', () =>  { 
        beforeEach(() => { 
            beforeTest('GET / HTTP: Get request to '+urlExample); 
        }); 
 
        test('GET / HTTP: Get request to '+urlExample, async () => { 
            var res = await api.get(urlExample).proxy(proxy); 
            beforeExpect('A 200(OK) response', () => expect(res.ok).toBeTruthy() ); 
 
        }); 
    });
 
    afterAll(() => { 
        process.stdout.write('-'.repeat(100) + '\n\n'); 
    }); 
  
}); 
