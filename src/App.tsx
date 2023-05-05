//import './App.css'

// https://go.dev/play/p/xKHN0qTFjjh.go?download=true

import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { DarkTheme, LightTheme, BaseProvider, styled } from 'baseui';
import { StatefulInput } from 'baseui/input';
import { Helmet } from 'react-helmet';
import { ProductCard } from "./product-card/product-card"
import { Example } from "./product-card/tabla"
import { useState, useEffect } from 'react'
import {
    ThemeProvider,
    createTheme,
    darkThemePrimitives
} from "baseui";

const primitives = {
  accent: 'hsl(334.3,64.6%,25.5%)', 
  accent50: 'hsl(332.9,60.8%,95%)',
  accent100: 'hsl(332.9,60.8%,90%)',
  accent200: 'hsl(332.9,60.8%,80%)',
  accent300: 'hsl(332.9,60.8%,70%)',
  accent400: 'hsl(332.9,60.8%,60%)',
  accent500: 'hsl(332.9,60.8%,50%)',
  accent600: 'hsl(332.9,60.8%,40%)',
  accent700: 'hsl(332.9,60.8%,30%)',
  accent800: 'hsl(332.9,60.8%,20%)',
  accent900: 'hsl(332.9,60.8%,10%)',
  accent950: 'hsl(332.9,60.8%,5%)',
};
const overrides = {
  colors: {
    buttonSecondaryFill: primitives.accent100,
    buttonSecondaryText: primitives.accent,
    buttonSecondaryHover: primitives.accent200,
    buttonSecondaryActive: primitives.accent300,
    buttonSecondarySelectedFill: primitives.accent200,
    buttonSecondarySelectedText: primitives.accent,
    buttonSecondarySpinnerForeground: primitives.accent700,
    buttonSecondarySpinnerBackground: primitives.accent300,
    buttonPrimaryHover: primitives.accent600,
    buttonPrimaryFill: primitives.accent,
  },
};

export default function App() {
    const engine = new Styletron();
    const theme = createTheme(primitives, overrides);
    const [mode, setMode] = useState<boolean>(false);
    const Centered = styled('div', {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: "#74E885"
    });
    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', event => {
                const colorScheme = event.matches;
                console.log(colorScheme); // "dark" or "light"
                setMode(colorScheme); 
                // https://dribbble.com/shots/16783244-Ponyweist-Customer-Relationship-Management-Dashboard
                //https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe
                //https://colormagic.app/palette/VGP05TypjX4Idjl8GAM0
                //https://colormagic.app/palette/aHkuM1wwfN7ijtnv84y4
                //https://colormagic.app/palette/MDzRh7trO2bzACsHrV4V
                //https://youtu.be/yieCFY-9e9M
                //https://qubstudio.com/blog/best-40-ux-ui-books-free-paid-versions/
                //https://dev.to/alexgurr/turning-a-react-app-into-a-pwa-with-offline-detection-service-workers-and-theming-142i#chapter-1 
                //https://www.youtube.com/watch?v=I82xZCs3HvQ
                //https://www.youtube.com/watch?v=RPY6KsCMs5E
                //D499B9
                //9055A2
                //https://www.webdesignrankings.com/resources/lolcolors/
                //#66327C
                //#525288
                //http://zhongguose.com/#yejuzi
                //https://nipponcolors.com/#sumire
                //https://codioful.com/own-pattern
                //https://www.colorhexmap.com/9e7a95
                //https://replit.com/bounties?service=3
            });
    }, []);
    return (

        <main>
            <Helmet>
                <title> Musteloidea </title>
                <style>{'body { background-color: #6b173b; }'}</style>
            </Helmet>
            <StyletronProvider value={engine}>
                <BaseProvider theme={mode ? DarkTheme : theme}>
                    <ProductCard></ProductCard>
                    <StatefulInput></StatefulInput>
                    <Example></Example>

                </BaseProvider>
            </StyletronProvider>
        </main>
    )
}