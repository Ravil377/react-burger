import { Form, Formik, FormikHelpers } from "formik";
import { IUserProps, useAppDispatch, useAppSelector } from "../../../utils/chema";
import * as Yup from 'yup';
import { patchUser } from "../../../services/actions/user";
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ProfileUserStyle from './ProfileUser.module.css';


export const ProfileUser = () => {
    const dispatch = useAppDispatch();

    const user = useAppSelector( store => store.user.user );

    const initialValues = {
        email: user ? user.email : '',
        password: '',
        name: user ? user.name : ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Введите корректный email')
            .required('Введите email'),
        password: Yup.string()
            .required('Введите пароль'),
        name: Yup.string()
            .required('Введите имя'),
    });

    const handleSubmit = (values: IUserProps, formikHelpers: FormikHelpers<IUserProps>) => {
        dispatch(patchUser(values));
        formikHelpers.resetForm();
    }

    return (
        <div className={ProfileUserStyle.profile}>
            <Formik 
                initialValues={initialValues} 
                onSubmit={handleSubmit}
                validationSchema={validationSchema}>
                {({ values, handleChange, handleReset, errors, touched, isValid, dirty }) => (
                    <Form >
                        <Input 
                            name="name"
                            placeholder="Имя" 
                            value={values.name} 
                            onChange={handleChange} 
                            icon="EditIcon"/>
                        <EmailInput 
                            name='email'
                            placeholder="Логин"
                            value={values.email} 
                            onChange={handleChange}
                            extraClass="mt-6" />
                        <PasswordInput 
                            name="password"
                            placeholder="Пароль" 
                            extraClass="mt-6 mb-6" 
                            value={values.password} 
                            onChange={handleChange} 
                            icon="EditIcon"/>
                        <Button 
                            htmlType="button" 
                            onClick={handleReset}
                            type="primary" 
                            extraClass="mr-6" 
                            disabled={!dirty}
                            size="medium">
                            Отмена
                        </Button>
                        <Button 
                            htmlType="submit" 
                            type="primary" 
                            disabled={!isValid || !dirty}
                            size="medium">
                            Сохранить
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}