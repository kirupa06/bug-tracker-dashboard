import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import './CreateBug.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ADDBUG, INCREMENTBUGID } from '../Redux/BugDataSlice';

const CreateBug = () => {
    const { control, register, handleSubmit, formState: { errors } } = useForm({ mode: 'all' });
    const navigate = useNavigate(); 
    const dispatch = useDispatch()
    const bugIDinfo = useSelector((state: any) => state.BugInfo.bugId)
    const issueTypes = [
        { value: 'task', label: 'Task' },
        { value: 'bug', label: 'Bug' },
        { value: 'enhancement', label: 'Enhancement' },
        { value: 'story', label: 'Story' },
    ];

    const reporterOptions = [
        { value: 'Kylian Mbappe', label: 'Kylian Mbappe' },
        { value: 'Antoine Griezmann', label: 'Antoine Griezmann' },
        { value: 'Presnel Kimpembe', label: 'Presnel Kimpembe' },
        { value: 'N\'Golo Kante', label: 'N\'Golo Kante' },
        { value: 'Paul Pogba', label: 'Paul Pogba' },
        { value: 'Raphael Varane', label: 'Raphael Varane' },
        { value: 'Kingsley Coman', label: 'Kingsley Coman' }
    ];

    const assigneeOptions = [
        { value: 'Lionel Messi', label: 'Lionel Messi' },
        { value: 'Angel Di Maria', label: 'Angel Di Maria' },
        { value: 'Paulo Dybala', label: 'Paulo Dybala' },
        { value: 'Lautaro Martinez', label: 'Lautaro Martinez' },
        { value: 'Sergio Aguero', label: 'Sergio Aguero' },
        { value: 'Emiliano Martinez', label: 'Emiliano Martinez' },
        { value: 'Rodrigo De Paul', label: 'Rodrigo De Paul' }
    ];


    const severityOptions = [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
    ];

    const labelOptions = [
        { value: 'none', label: 'None' },
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
    ];



    const onSubmit = (data: any) => {
        console.log(data, 'Submitted Data');

        dispatch(ADDBUG({ ...data, bugId: bugIDinfo, status: 'open' }))
        dispatch(INCREMENTBUGID())
        navigate('/');
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label>Summary</label>
                <input
                    type='text'
                    className={`input-field ${errors.summary ? 'error' : ''}`}
                    placeholder='Summarize the issue in a few words'
                    {...register("summary", { required: 'This field is required' })}
                />
                {errors.summary && (
                    <p className="error-message">{typeof errors.summary.message === 'string' ? errors.summary.message : 'Error'}</p>
                )}
            </div>

            <div className="form-group">
                <label>Issue Type</label>
                <Controller
                    name="issueType"
                    control={control}
                    defaultValue={{ value: 'bug', label: 'Bug' }}
                    render={({ field }) => (
                        <Select
                            options={issueTypes}
                            className={`select-field ${errors.issueType ? 'error' : ''}`}
                            value={field.value || null}
                            onChange={(selectedOption) => field.onChange(selectedOption)}
                            placeholder="Select an issue type"
                        />
                    )}
                />
                {errors.issueType && (
                    <p className="error-message">{typeof errors.issueType.message === 'string' ? errors.issueType.message : 'Error'}</p>
                )}
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea
                    {...register("description")}
                    className={`textarea-field ${errors.description ? 'error' : ''}`}
                    placeholder="Enter your description here..."
                    rows={4}
                />
                {errors.description && (
                    <p className="error-message">{typeof errors.description.message === 'string' ? errors.description.message : 'Error'}</p>
                )}
            </div>

            <div className="form-group">
                <label>Reporter</label>
                <Controller
                    name="reporters"
                    control={control}
                    defaultValue={[]}
                    rules={{ required: 'At least one reporter is required' }}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <>
                            <Select
                                options={reporterOptions}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                className={`select-field ${errors.reporters ? 'error' : ''}`}
                                placeholder="Select a reporter"
                            />
                            {errors.reporters && (
                                <p className="error-message">{typeof errors.reporters.message === 'string' ? errors.reporters.message : 'Error'}</p>
                            )}
                        </>
                    )}
                />
            </div>

            <div className="form-group">
                <label>Priority</label>
                <Controller
                    name='priority'
                    control={control}
                    rules={{ required: 'Priority is required' }}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <>
                            <Select
                                options={severityOptions}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                className={`select-field ${errors.priority ? 'error' : ''}`}
                                placeholder="Select priority"
                            />
                            {errors.priority && (
                                <p className="error-message">{typeof errors.priority.message === 'string' ? errors.priority.message : 'Error'}</p>
                            )}
                        </>
                    )}
                />
            </div>

            <div className="form-group">
                <label>Label</label>
                <Controller
                    name="label"
                    control={control}
                    defaultValue={{ value: 'none', label: 'None' }}
                    rules={{ required: 'At least one option is required' }}
                    render={({ field }) => (
                        <>
                            <CreatableSelect
                                {...field}
                                options={labelOptions}
                                isClearable={false}
                                isMulti={true}
                                placeholder="Select or type to create new..."
                                className={`select-field ${errors.label ? 'error' : ''}`}
                            />
                            {errors.label && (
                                <p className="error-message">{typeof errors.label.message === 'string' ? errors.label.message : 'Error'}</p>
                            )}
                        </>
                    )}
                />
            </div>

            <div className="form-group">
                <label>Assignee</label>
                <Controller
                    name="assignees"
                    control={control}
                    defaultValue={[]}
                    rules={{ required: 'At least one assignee is required' }}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <>
                            <Select
                                options={assigneeOptions}
                                onChange={onChange}
                                onBlur={onBlur}
                                maxMenuHeight={200}
                                value={value}
                                ref={ref}
                                className={`select-field ${errors.assignees ? 'error' : ''}`}
                                placeholder="Select assignee"
                            />
                            {errors.assignees && (
                                <p className="error-message">{typeof errors.assignees.message === 'string' ? errors.assignees.message : 'Error'}</p>
                            )}
                        </>
                    )}
                />
            </div>

            <button type='submit'>Create</button>
        </form>
    );
}

export default CreateBug;
