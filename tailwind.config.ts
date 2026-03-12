
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Paleta de cores do projeto (nova — tokens adicionais, flat keys)
				'primary-dark':	   '#1A3A6B',
				'secondary-light': '#8FA85C',
				'bg-agua':		     '#D4E8D8',
				'bg-light':		     '#F0F5EC',
				'dark':			         '#2C2C1E',
				'terra-1':	         '#934211',
				'terra-2':	         '#7A4900',
				'terra-3':	         '#B5771C',
				// Paleta de cores do projeto
				azul: {
					1: '#8BB6CC',
					2: '#173D90',
					3: '#1D3F6C',
				},
				verde: {
					1: '#BED19F',
					2: '#9CB96B',
					3: '#80A94D',
					4: '#507030',
				},
				marrom: {
					1: '#A68943',
					2: '#674321',
				},
				// Cores personalizadas (mantidas para compatibilidade)
				darktext: '#100B0D',
				highlight: '#173D90', // Azul 2
				tag: '#80A94D', // Verde 3
				lightbg: '#8BB6CC', // Azul 1 (claro)
				iconblue: '#173D90', // Azul 2
				nature: {
					50: '#f3f8f2',
					100: '#e7f0e4',
					200: '#d5e4d1',
					300: '#BED19F', // Verde 1
					400: '#9CB96B', // Verde 2
					500: '#80A94D', // Verde 3
					600: '#507030', // Verde 4
					700: '#4c6946',
					800: '#405539',
					900: '#364731',
					950: '#1d271b',
				},
				spirit: {
					50: '#f5f3ff',
					100: '#e7f0e4',
					200: '#d5e4d1',
					300: '#8BB6CC', // Azul 1
					400: '#1D3F6C', // Azul 3
					500: '#173D90', // Azul 2
					600: '#7c3aed',
					700: '#6d28d9',
					800: '#5b21b6',
					900: '#4c1d95',
					950: '#2e1065',
				},
				earth: {
					50: '#faf5f0',
					100: '#f0e6da',
					200: '#e0cdb8',
					300: '#A68943', // Marrom 1
					400: '#bd8e6a',
					500: '#674321', // Marrom 2
					600: '#a06544',
					700: '#84513a',
					800: '#6c4434',
					900: '#5a3a2f',
					950: '#301d17',
				},
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
				display: ['Cinzel', 'serif'],
				lato: ['Lato', 'sans-serif'],
			},
			borderRadius: {
				sm: '2px',
				DEFAULT: '4px',
				md: '6px',
				lg: '8px',
				xl: '12px',
				'2xl': '16px',
				'3xl': '24px',
				full: '9999px',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(0.95)', opacity: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-out': 'fade-out 0.6s ease-out',
				'scale-in': 'scale-in 0.5s ease-out',
				'scale-out': 'scale-out 0.5s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-gentle': 'pulse-gentle 4s ease-in-out infinite',
				'shimmer': 'shimmer 3s linear infinite',
				'enter': 'fade-in 0.6s ease-out, scale-in 0.5s ease-out',
				'exit': 'fade-out 0.6s ease-out, scale-out 0.5s ease-out'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(20px)',
			},
			transitionProperty: {
				'height': 'height',
				'spacing': 'margin, padding',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
