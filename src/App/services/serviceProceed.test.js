//require("@jest/globals");

// Services
import serviceProceed from './serviceProceed.js'

describe.skip('TEST OF SERVICE : serviceProceed', () => {
  describe('Assessment proceeding', () => {
    describe('When proceeding is successful', () => {
      test('then all functions are called', async () => {
        let log = []
        let testProceedInputs = {
          lockuifunction: (log) => {
            log.push({
              date: new Date(),
              message: 'serviceProceed.lockuifunction',
              tags: ['function'],
            })
          },
          unlockuifunction: (log) => {
            log.push({
              date: new Date(),
              message: 'serviceProceed.unlockuifunction',
              tags: ['function'],
            })
          },
          getinputsfunction: (log) => {
            log.push({
              date: new Date(),
              message: 'serviceProceed.getinputsfunction',
              tags: ['function'],
            })
            return {
              inputs: {
                fieldA: 'A',
                field1: 1,
                fieldList: [1, 2, 3],
              },
            }
          },
          wrappingfunction: (serviceInputs, log) => {
            let wrappedServiceInputs = serviceInputs
            wrappedServiceInputs.field1A =
              '' + serviceInputs.field1 + serviceInputs.fieldA
            log.push({
              date: new Date(),
              message: 'serviceProceed.wrappingfunction',
              tags: ['function'],
              wrappedServiceInputs: wrappedServiceInputs,
            })
            return wrappedServiceInputs
          },
          sercivechecks: [
            {
              // Check input root is available
              field: 'inputs',
              error: 'test.error.inputs',
              subchecks: [
                {
                  // Check field A is available
                  field: 'fieldA',
                  error: 'test.error.fieldA',
                },
                {
                  // Check field 1 is available
                  field: 'field1',
                  error: 'test.error.field1',
                },
                {
                  // Check fieldList is available
                  field: 'fieldList',
                  error: 'test.error.fieldList',
                },
              ],
            },
          ],
          getcheckoutcomedispatchfunction: (log) => {
            log.push({
              date: new Date(),
              message: 'serviceProceed.getcheckoutcomedispatchfunction',
              tags: ['function'],
            })
            return 'dummyslice/command'
          },
          repackagingfunction: (serviceInputs, log) => {
            let repackagedServiceInputs = { ...serviceInputs }
            delete repackagedServiceInputs.field1A
            log.push({
              date: new Date(),
              message: 'serviceProceed.repackagingfunction',
              tags: ['function'],
              repackagedServiceInputs: repackagedServiceInputs,
            })
            return repackagedServiceInputs
          },
          apicall: async (serviceInputs, log) => {
            log.push({
              date: new Date(),
              message: 'serviceProceed.apicall',
              tags: ['function'],
            })
            return {
              type: 'test.success',
              serviceInputs: serviceInputs,
            }
          },
          getmanageresponsefunction: (response, log) => {
            log.push({
              date: new Date(),
              message: 'serviceProceed.getmanageresponsefunction',
              tags: ['function'],
            })
            let responses = {
              'test.success': (log) => {
                log.push({
                  date: new Date(),
                  message: 'serviceProceed.manageresponse.success',
                  tags: ['function'],
                })
              },
              'test.failure': (log) => {
                log.push({
                  date: new Date(),
                  message: 'serviceProceed.manageresponse.failure',
                  tags: ['function'],
                })
              },
            }
            return responses[response]
          },
        }
        await serviceProceed(testProceedInputs, log)
        //console.log("log",log)
        expect(
          log.filter((l) => {
            return l.message.includes('serviceProceed.lockuifunction')
          }).length
        ).toBe(1)
        //expect(log.filter(l => {return l.message.includes("serviceProceed.unlockuifunction")}).length).toBe(1)
        expect(
          log.filter((l) => {
            return l.message.includes('serviceProceed.getinputsfunction')
          }).length
        ).toBe(1)
        expect(
          log.filter((l) => {
            return l.message.includes('serviceProceed.wrappingfunction')
          }).length
        ).toBe(1)
        expect(
          log.filter((l) => {
            return l.message.includes(
              'serviceProceed.getcheckoutcomedispatchfunction'
            )
          }).length
        ).toBe(1)
        expect(
          log.filter((l) => {
            return l.message.includes('serviceProceed.repackagingfunction')
          }).length
        ).toBe(1)
        expect(
          log.filter((l) => {
            return l.message.includes('serviceProceed.apicall')
          }).length
        ).toBe(1)
        expect(
          log.filter((l) => {
            return l.message.includes(
              'serviceProceed.getmanageresponsefunction'
            )
          }).length
        ).toBe(1)
        expect(
          log.filter((l) => {
            return l.message.includes('serviceProceed.manageresponse.success')
          }).length
        ).toBe(1)
      })
    })
  })
})
