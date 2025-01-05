import { View, Text, TextProps } from 'react-native';

type TextType = 'normal' | 'h1' | 'h2' | 'semi-bold' | 'link';

/*
font-normal
text-3xl
text-xl

font-bold
font-normal underline
*/

interface Props extends TextProps {
  className?: string;
  type?: TextType;
}

const ThemedText = ({ className, type, ...rest }: Props) => {
  //  className="mt-10 text-3xl text-light-text dark:text-dark-text"
  return (
    <Text
      className={[
        className === undefined ? 'text-light-text dark:text-dark-text' : undefined,
        type === 'normal' ? 'font-normal' : undefined,
        type === 'h1' ? 'text-3xl' : undefined,
        type === 'h2' ? 'text-xl' : undefined,
        type === 'semi-bold' ? 'font-semibold' : undefined,
        type === 'link' ? 'font-normal underline' : undefined,
        className,
      ].join(' ')}
      {...rest}
    />
  );
};
export default ThemedText;