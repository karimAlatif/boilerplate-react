import { defineConfig } from 'vite';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'

export default defineConfig({
	build: {
		outDir: 'build',
		sourcemap: true,
	},
	optimizeDeps: {
		exclude: ['js-big-decimal'],
		esbuildOptions:{
          plugins:[
            esbuildCommonjs(['ui-widgets','ui-widgets/'])
          ]
	},
}
});
