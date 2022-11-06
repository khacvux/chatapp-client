import { useField } from "formik";

interface ITextFieldProps {
  name: string;
  label?: string;
  placeholder: string;
  type: string;
  textarea?: boolean;
}

export default function TextField({ textarea, ...props }: ITextFieldProps) {
  const [field, { error }] = useField(props);

  return (
    <>
      {textarea ? (
        <textarea
          className="bg-light2 outline-none p-5 border-x border-x-1
         border-[#a5a7a9] font-light resize-none w-full my-3 h-80"
          id={field.name}
          value={field.value}
          onChange={field.onChange}
          {...props}
        />
      ) : (
        <input
          className="w-full p-3 bg-light2 outline-none"
          id={field.name}
          value={field.value}
          onChange={field.onChange}
          {...props}
        />
      )}
    </>
  );
}
