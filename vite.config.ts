import { defineConfig } from 'vite';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'

export default defineConfig({
	build: {
		outDir: 'build',
		sourcemap: true,
	},
	// define: { "process.env.NODE_ENV": '"development"' },
	optimizeDeps: {
		exclude: ['js-big-decimal'],
		esbuildOptions:{
          plugins:[
            esbuildCommonjs(['ui-widgets','ui-widgets/'])
          ]
	},
}
});
