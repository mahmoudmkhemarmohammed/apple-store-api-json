const jsonServer = require('json-server');
const auth = require('json-server-auth');

// إنشاء التطبيق
const app = jsonServer.create();

// إنشاء Router وقاعدة البيانات
const router = jsonServer.router('db.json');

// Middlewares الافتراضية
const middlewares = jsonServer.defaults();

// استخدام Middlewares
app.use(middlewares);
app.use(jsonServer.bodyParser);

// قواعد المصادقة
const rules = auth.rewriter({
  users: 600, // فقط المالك يمكنه الوصول
  posts: 644, // المالك يمكنه الكتابة، والجميع يمكنهم القراءة
});

// تطبيق قواعد المصادقة
app.use(rules);

// ربط قاعدة البيانات بالتطبيق
app.db = router.db;

// تفعيل json-server-auth
app.use(auth);

// تفعيل Router
app.use(router);

// تشغيل الخادم
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`JSON Server with Auth is running on port ${port}`);
});
