import { renderHook, act } from '@testing-library/react-hooks';
import { useInput } from './useInput';

describe('Hook: useUserAnswers', () => {
  it('Должен вернуть 10 элементов', () => {
    const { result } = renderHook(() =>
      useInput('', {}),
    );

    const { onBlur, onChange } = result.current;

    expect(Object.values(result.current)).toHaveLength(10);
    expect(onChange).toBeInstanceOf(Function);
    expect(onBlur).toBeInstanceOf(Function);
  });

  it('Должен установить состояние blur и проверить, что onBlur был вызван', () => {
    const { result } = renderHook(() =>
      useInput('', {}),
    );

    const { onBlur, isDirty } = result.current;

    expect(isDirty).toBe(false);

    act(() => onBlur());

    expect(result.current.isDirty).toBe(true);
  });

  it('Должен вернуть состояния ошибок как false, а валидности как true', () => {
    const { result } = renderHook(() =>
      useInput('nikitaTester@gmail.com', { isEmpty: false, minLength: 2, maxLength: 22, isEmail: false, isOnlySpace: false }),
    );
    act(() => result.current.onBlur());

    const { isDirty, isEmpty, emailError, maxLengthError, minLengthError, spaceError, inputValid } = result.current;

    expect(isDirty).toBe(true);
    expect(inputValid).toBe(true);
    expect(isEmpty).toBe(false);
    expect(emailError).toBe(false);
    expect(maxLengthError).toBe(false);
    expect(minLengthError).toBe(false);
    expect(spaceError).toBe(false);
  });

  it('Должен изменить значение value', () => {
    const event = {
      preventDefault() { },
      target: { value: 'test' },
    };

    const { result } = renderHook(() =>
      useInput('', { isEmpty: false, minLength: 2, maxLength: 22, isEmail: false, isOnlySpace: false }),
    );

    const { onBlur, onChange, value } = result.current;

    act(() => onBlur());
    expect(value).toBe('');

    act(() => onChange(event));
    expect(result.current.value).toBe('test');
  });
});
