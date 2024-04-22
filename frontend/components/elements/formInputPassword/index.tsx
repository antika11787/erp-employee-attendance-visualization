import './index.scss';
import { Controller, FieldError } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface FormInputPasswordProps {
    label?: string;
    nameProp: string;
    placeholder: string;
    requiredProp: string;
    showPassword?: boolean;
    togglePasswordVisibility?: () => void;
    control: any;
    errors: any;
    watch: (name: string) => any;
    rules?: any;
}

const FormInputPassword = ({
    label,
    nameProp,
    placeholder,
    requiredProp,
    showPassword,
    togglePasswordVisibility,
    control,
    errors,
    watch,
    rules,
}: FormInputPasswordProps) => {

    return nameProp === 'password' ? (
        <div className="form-item">
            <label className="form-label">
                {label}{" "}
            </label>
            <Controller
                name={nameProp}
                control={control}
                rules={
                    rules?rules:
                    {
                    required: requiredProp,
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                    },
                }}
                render={({ field }) => (
                    <div className="password-input">
                        <input
                            placeholder={placeholder}
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            className="form-input-password"
                        />
                        <button
                            type="button"
                            className='eye-button'
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <FiEyeOff />
                            ) : (
                                <FiEye />
                            )}
                        </button>
                    </div>
                )}
            />
            {errors[nameProp] && typeof errors[nameProp] === 'object' && (
                <h5 className='error-message'>{(errors[nameProp] as FieldError).message}</h5>
            )}
        </div>
    ) : (
        <div className="form-item">
            <label className="form-label">
                {label}{" "}
            </label>
            <Controller
                name={nameProp}
                control={control}
                rules={{
                    required: requiredProp,
                    validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                }}
                render={({ field }) => (
                    <div className="password-input">
                        <input
                            placeholder={placeholder}
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            className="form-input-password"
                        />
                        <button
                            type="button"
                            className='eye-button'
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <FiEyeOff />
                            ) : (
                                <FiEye />
                            )}
                        </button>
                    </div>
                )}
            />
            {errors[nameProp] && typeof errors[nameProp] === 'object' && (
                <h5 className='error-message'>{(errors[nameProp] as FieldError).message}</h5>
            )}
        </div>
    )
}

export default FormInputPassword;
