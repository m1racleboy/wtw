import { renderHook } from '@testing-library/react-hooks';
import { useValidation } from './useValidation';

describe('Hook: useUserAnswers', () => {
  it('Должен вернуть 6 элементов', () => {
    const { result } = renderHook(() =>
      useValidation('', {}),
    );

    expect(Object.values(result.current)).toHaveLength(6);
  });

  it('Должен вернуть состояния ошибок как false', () => {
    const { result } = renderHook(() =>
      useValidation('nikitaTester@gmail.com', { isEmpty: false, minLength: 2, maxLength: 22, isEmail: false, isOnlySpace: false }),
    );

    const { isEmpty, emailError, maxLengthError, minLengthError, spaceError } = result.current;

    expect(isEmpty).toBe(false);
    expect(emailError).toBe(false);
    expect(maxLengthError).toBe(false);
    expect(minLengthError).toBe(false);
    expect(spaceError).toBe(false);
  });

  it('Должен вернуть начальное состояние без изменений при переданном параметре, который не был предусмотрен', () => {
    const { result } = renderHook(() =>
      useValidation('', { isTest: true }),
    );

    const { isEmpty, emailError, maxLengthError, minLengthError, spaceError, inputValid } = result.current;

    expect(isEmpty).toBe(true);
    expect(emailError).toBe(false);
    expect(maxLengthError).toBe(false);
    expect(minLengthError).toBe(false);
    expect(spaceError).toBe(false);
    expect(inputValid).toBe(false);
  });
});
