import getCreditCardInfo from './credit-card-info';
import creditCardType from 'credit-card-type';

jest.mock('credit-card-type', () => jest.fn());

describe('credit-card-info helper', () => {
  it('returns credit-card-info properly', () => {
    const cardType1 = { type: 'visa', gaps: [4, 8, 12], lengths: [16] };
    const cardType2 = { type: 'american-express', gaps: [4, 10], lengths: [14, 16, 19] };

    creditCardType.mockImplementationOnce(() => [cardType1, cardType2]);

    expect(getCreditCardInfo('41750026c93609189l')).toEqual({
      brand: 'visa',
      formattedValue: '4175 0026 9360 9189'
    });

    creditCardType.mockImplementationOnce(() => [cardType2, cardType1]);

    expect(getCreditCardInfo('370446318192827')).toEqual({
      brand: 'american-express',
      formattedValue: '3704 463181 92827'
    });
  });
});
