import t from 'tcomb-form-native';
export default formValidation = {
	email: t.refinement(t.String, (s) => {
		s = s.trim();
		return /@/.test(s);
	}),
	password: t.refinement(t.String, (s) => {
		return s.length >= 6;
	})
};