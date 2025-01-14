import { Preview } from '@storybook/react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import '@/styles/index.css';
import { fontsClassName } from '@/lib/utils/fonts';
import { Connect } from '@/ui/app/connect';
import { Providers } from '@/ui/app/providers';

const preview: Preview = {
  parameters: {
    darkMode: {
      stylePreview: true,
    },
    nextjs: {
      appDirectory: true,
    },
    showConnect: false,
  },
  decorators: [
    (Story, { parameters }) => {
      const darkMode = useDarkMode();

      const { setTheme } = useTheme();

      useEffect(() => {
        setTheme(darkMode ? 'dark' : 'light');
      }, [darkMode, setTheme]);

      useEffect(() => {
        document.body.className += ` ${fontsClassName}`;
      }, []);

      return (
        <Providers>
          <div className="space-y-6">
            {parameters.showConnect === true && <Connect />}
            <Story />
          </div>
        </Providers>
      );
    },
  ],
};

export default preview;
