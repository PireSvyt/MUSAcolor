//require("@jest/globals");

// Services
import serviceProceedCheck, { updateOutcome } from './serviceProceedCheck.js'

describe('TEST OF SERVICE : updateOutcome', () => {
  describe('When the outcome turns to false', () => {
    let currentOutcome = {
      proceed: true,
      errors: [],
      stateChanges: {
        errors: {},
      },
      confirmation: undefined,
    }
    let editOutcome = {
      proceed: false,
      errors: ['a new error'],
      stateChanges: {
        errors: {
          anerror: true,
        },
      },
      confirmation: true,
    }
    let resultingOutcome = updateOutcome(currentOutcome, editOutcome)
    test('then the proceed is false', () => {
      expect(resultingOutcome.proceed).toBeFalsy()
    })
    test('then the errors are accounted for', () => {
      expect(resultingOutcome.errors.length).toBe(1)
    })
    test('then the state changes are accounted for', () => {
      expect(resultingOutcome.stateChanges.errors.anerror).toBeTruthy()
    })
    test('then the confirmation accounted for', () => {
      expect(resultingOutcome.confirmation).toBeTruthy()
    })
  })
  describe('When the outcome is already false', () => {
    let currentOutcome = {
      proceed: false,
      errors: ['a new error'],
      stateChanges: {
        errors: {
          anerror: true,
        },
      },
      confirmation: undefined,
    }
    let editOutcome = {
      proceed: false,
      errors: ['another new error'],
      stateChanges: {
        errors: {
          anothererror: true,
        },
      },
      confirmation: true,
    }
    let resultingOutcome = updateOutcome(currentOutcome, editOutcome)
    test('then the proceed is false', () => {
      expect(resultingOutcome.proceed).toBeFalsy()
    })
    test('then the errors are accounted for', () => {
      expect(resultingOutcome.errors.length).toBe(2)
    })
    test('then the state changes are accounted for', () => {
      expect(resultingOutcome.stateChanges.errors.anerror).toBeTruthy()
      expect(resultingOutcome.stateChanges.errors.anothererror).toBeTruthy()
    })
    test('then the confirmation accounted for', () => {
      expect(resultingOutcome.confirmation).toBeTruthy()
    })
  })
})

describe('TEST OF SERVICE : serviceProceedCheck', () => {
  describe('Assessment with empty checks', () => {
    describe('When serviceChecks is empty', () => {
      let checkOutcome = serviceProceedCheck(
        {
          fieldA: 'A',
          field1: 1,
          fieldList: [1, 2, 3],
        },
        []
      )
      //console.log("checkOutcome", checkOutcome)

      test('then proceed is possible', () => {
        expect(checkOutcome.proceed).toBeTruthy()
      })
      test('then no errors are provided', () => {
        expect(checkOutcome.errors.length).toBe(0)
      })
      test('then no changes are provided', () => {
        expect(Object.keys(checkOutcome.stateChanges.errors).length).toBe(0)
        expect(Object.keys(checkOutcome.stateChanges).length).toBe(1)
      })
    })
  })
  describe('Assessment with passing checks', () => {
    describe('When serviceChecks is passing', () => {
      let checkOutcome = serviceProceedCheck(
        {
          fieldA: 'A',
          field1: 1,
          fieldList: [1, 2, 3],
        },
        [
          {
            field: 'fieldA',
            error: 'test.error.fieldA',
            fieldsinerror: ['fieldA'],
          },
        ]
      )
      //console.log("checkOutcome", checkOutcome)

      test('then proceed is possible', () => {
        expect(checkOutcome.proceed).toBeTruthy()
      })
      test('then no errors are provided', () => {
        expect(checkOutcome.errors.length).toBe(0)
      })
      test('then no changes are provided', () => {
        expect(Object.keys(checkOutcome.stateChanges.errors).length).toBe(0)
        expect(Object.keys(checkOutcome.stateChanges).length).toBe(1)
      })
    })
  })
  describe('Assessment with failing checks', () => {
    describe('When field is undefined', () => {
      let checkOutcome = serviceProceedCheck(
        {
          fieldA: 'A',
          field1: 1,
          fieldList: [1, 2, 3],
        },
        [
          {
            field: 'undefinedfield',
            error: 'test.error.undefinedfield',
            fieldsinerror: ['undefinedfield'],
          },
        ]
      )
      //console.log("checkOutcome", checkOutcome)

      test('then proceed is not possible', () => {
        expect(checkOutcome.proceed).toBeFalsy()
      })
      test('then a error is provided', () => {
        expect(checkOutcome.errors.length).toBe(1)
        expect(checkOutcome.errors).toContain('test.error.undefinedfield')
      })
      test('then a state changes are provided', () => {
        expect(Object.keys(checkOutcome.stateChanges.errors).length).toBe(1)
        expect(checkOutcome.stateChanges.errors.undefinedfield).toBe(true)
      })
    })
    describe('When field is a null number', () => {
      let checkOutcome = serviceProceedCheck(
        {
          fieldA: 'A',
          fieldNull: null,
        },
        [
          {
            field: 'fieldNull',
            error: 'test.error.fieldNull',
            fieldsinerror: ['fieldNull'],
          },
        ]
      )
      //console.log("checkOutcome", checkOutcome)

      test('then proceed is not possible', () => {
        expect(checkOutcome.proceed).toBeFalsy()
      })
      test('then a error is provided', () => {
        expect(checkOutcome.errors.length).toBe(1)
        expect(checkOutcome.errors).toContain('test.error.fieldNull')
      })
      test('then a state changes are provided', () => {
        expect(Object.keys(checkOutcome.stateChanges.errors).length).toBe(1)
        expect(checkOutcome.stateChanges.errors.fieldNull).toBe(true)
      })
    })
    describe('When field is an empty list', () => {
      let checkOutcome = serviceProceedCheck(
        {
          fieldA: 'A',
          field1: 1,
          fieldList: [],
        },
        [
          {
            field: 'fieldList',
            error: 'test.error.fieldList',
            fieldsinerror: ['fieldList'],
          },
        ]
      )
      //console.log("checkOutcome", checkOutcome)

      test('then proceed is not possible', () => {
        expect(checkOutcome.proceed).toBeFalsy()
      })
      test('then a error is provided', () => {
        expect(checkOutcome.errors.length).toBe(1)
        expect(checkOutcome.errors).toContain('test.error.fieldList')
      })
      test('then a state changes are provided', () => {
        expect(Object.keys(checkOutcome.stateChanges.errors).length).toBe(1)
        expect(checkOutcome.stateChanges.errors.fieldList).toBe(true)
      })
    })
    describe('When field is an empty dict', () => {
      let checkOutcome = serviceProceedCheck(
        {
          fieldA: 'A',
          field1: 1,
          fieldDict: {},
        },
        [
          {
            field: 'fieldDict',
            error: 'test.error.fieldDict',
            fieldsinerror: ['fieldDict'],
          },
        ]
      )
      //console.log("checkOutcome", checkOutcome)

      test('then proceed is not possible', () => {
        expect(checkOutcome.proceed).toBeFalsy()
      })
      test('then a error is provided', () => {
        expect(checkOutcome.errors.length).toBe(1)
        expect(checkOutcome.errors).toContain('test.error.fieldDict')
      })
      test('then a state changes are provided', () => {
        expect(Object.keys(checkOutcome.stateChanges.errors).length).toBe(1)
        expect(checkOutcome.stateChanges.errors.fieldDict).toBe(true)
      })
    })
  })
  describe('Assessment with checkfunction checks', () => {
    describe('When checkfunction is passing', () => {
      let checkOutcome = serviceProceedCheck(
        {
          fieldList: [1, 2, 3],
        },
        [
          {
            field: 'fieldList',
            error: 'test.error.fieldList',
            fieldsinerror: ['fieldList'],
            checkfunction: (serviceInputs) => {
              if (serviceInputs.fieldList.length !== 3) {
                return { proceed: false }
              } else {
                return { proceed: true }
              }
            },
          },
        ]
      )
      //console.log("checkOutcome", checkOutcome)

      test('then proceed is possible', () => {
        expect(checkOutcome.proceed).toBeTruthy()
      })
      test('then no errors are provided', () => {
        expect(checkOutcome.errors.length).toBe(0)
      })
      test('then no changes are provided', () => {
        expect(Object.keys(checkOutcome.stateChanges.errors).length).toBe(0)
        expect(Object.keys(checkOutcome.stateChanges).length).toBe(1)
      })
    })
    describe('When checkfunction is failing', () => {
      let checkOutcome = serviceProceedCheck(
        {
          fieldList: [1, 2, 3],
        },
        [
          {
            field: 'fieldList',
            error: 'test.error.fieldList',
            fieldsinerror: ['fieldList'],
            checkfunction: (serviceInputs) => {
              if (serviceInputs.fieldList.length === 3) {
                return {
                  proceed: false,
                  errors: ['test.error.fieldList'],
                  stateChanges: {
                    errors: {
                      fieldList: true,
                    },
                  },
                }
              } else {
                return { proceed: true }
              }
            },
          },
        ]
      )
      //console.log("checkOutcome", checkOutcome)

      test('then proceed is not possible', () => {
        expect(checkOutcome.proceed).toBeFalsy()
      })
      test('then a error is provided', () => {
        expect(checkOutcome.errors.length).toBe(1)
        expect(checkOutcome.errors).toContain('test.error.fieldList')
      })
      test('then a state changes are provided', () => {
        expect(Object.keys(checkOutcome.stateChanges.errors).length).toBe(1)
        expect(checkOutcome.stateChanges.errors.fieldList).toBe(true)
      })
    })
  })
  describe('Assessment with subsequent checks', () => {
    describe('When subsequent check is passing staying on parent', () => {
      let checkOutcome = serviceProceedCheck(
        {
          fieldList: [1, 2, 3],
        },
        [
          {
            field: 'fieldList',
            error: 'test.error.fieldList',
            fieldsinerror: ['fieldList'],
            subchecks: [
              {
                error: 'test.error.subcheck',
                fieldsinerror: ['subcheck'],
                checkfunction: (serviceInputs) => {
                  if (serviceInputs.fieldList.length !== 3) {
                    return { proceed: false }
                  } else {
                    return { proceed: true }
                  }
                },
              },
            ],
          },
        ]
      )
      //console.log("checkOutcome", checkOutcome)

      test('then proceed is possible', () => {
        expect(checkOutcome.proceed).toBeTruthy()
      })
      test('then no errors are provided', () => {
        expect(checkOutcome.errors.length).toBe(0)
      })
      test('then no changes are provided', () => {
        expect(Object.keys(checkOutcome.stateChanges.errors).length).toBe(0)
        expect(Object.keys(checkOutcome.stateChanges).length).toBe(1)
      })
    })
    describe('When subsequent check is passing moving to child', () => {
      let checkOutcome = serviceProceedCheck(
        {
          parent: { child: 'here it is' },
        },
        [
          {
            field: 'parent',
            error: 'test.error.parent',
            fieldsinerror: ['parent'],
            subchecks: [
              {
                field: 'child',
                error: 'test.error.child',
                fieldsinerror: ['child'],
                checkfunction: (serviceInputs) => {
                  if (serviceInputs.parent.child !== 'here it is') {
                    return { proceed: false }
                  } else {
                    return { proceed: true }
                  }
                },
              },
            ],
          },
        ]
      )
      //console.log("checkOutcome", checkOutcome)

      test('then proceed is possible', () => {
        expect(checkOutcome.proceed).toBeTruthy()
      })
      test('then no errors are provided', () => {
        expect(checkOutcome.errors.length).toBe(0)
      })
      test('then no changes are provided', () => {
        expect(Object.keys(checkOutcome.stateChanges.errors).length).toBe(0)
        expect(Object.keys(checkOutcome.stateChanges).length).toBe(1)
      })
    })
    describe('When checkfunction is failing', () => {
      let checkOutcome = serviceProceedCheck(
        {
          fieldList: [1, 2, 3],
        },
        [
          {
            field: 'fieldList',
            error: 'test.error.fieldList',
            fieldsinerror: ['fieldList'],
            subchecks: [
              {
                error: 'test.error.subcheck',
                fieldsinerror: ['subcheck'],
                checkfunction: (serviceInputs) => {
                  if (serviceInputs.fieldList.length === 3) {
                    return {
                      proceed: false,
                      errors: ['test.error.subcheck'],
                      stateChanges: {
                        errors: {
                          subcheck: true,
                        },
                      },
                    }
                  } else {
                    return { proceed: true }
                  }
                },
              },
            ],
          },
        ]
      )
      //console.log("checkOutcome", checkOutcome)

      test('then proceed is not possible', () => {
        expect(checkOutcome.proceed).toBeFalsy()
      })
      test('then a error is provided', () => {
        expect(checkOutcome.errors.length).toBe(1)
        expect(checkOutcome.errors).toContain('test.error.subcheck')
      })
      test('then a state changes are provided', () => {
        expect(Object.keys(checkOutcome.stateChanges.errors).length).toBe(1)
        expect(checkOutcome.stateChanges.errors.subcheck).toBe(true)
      })
    })
  })
})
