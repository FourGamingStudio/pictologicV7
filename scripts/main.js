const ui = require("four_ui-lib/four");

const core = require("pictologic/core");

var ptl;

ui.addMenuButton("Logic hình ảnh", "paste", () => {
	ptl.show();
});

ui.onLoad(() => {
	// Add button in Schematics dialog
	Vars.ui.schematics.buttons.button("Logic hình ảnh", Icon.paste, () => {
		ptl.show();
	});

	ptl = new BaseDialog("Logic hình ảnh");
	ptl.cont.add("Hướng Dẫn Sử Dụng");
	ptl.cont.row();
	ptl.cont.add("[coral]1.[] Vui lòng chọn hình ảnh có đuôi là [stat].png[], và cắt bức hình ấy thành tỉ lệ [stat]1:1[].");
	ptl.cont.row();
	ptl.cont.add("[coral]2.[] Nhấn [stat]khởi tạo[] để tạo bản vẽ hình ảnh.");
	ptl.cont.row();
	ptl.cont.add("[coral]Nhớ đăng ký cho Four Gaming Studio nhé!!!.");
	ptl.cont.row();

	ptl.cont.button("Chọn hình ảnh", () => {
		Vars.platform.showFileChooser(false, "png", file => {
			try {
				const bytes = file.readBytes();
				core.image = new Pixmap(bytes);
			} catch (e) {
				ui.showError("Không thể tải hình ảnh!", e);
			}
		});
	}).size(240, 50);
	ptl.cont.row();

	ptl.cont.label(() => core.stage).center();

	ptl.addCloseButton();
	ptl.buttons.button("$settings", Icon.settings, () => {
		core.settings.show();
	});
	ptl.buttons.button("Khởi Tạo", Icon.export, () => {
		new java.lang.Thread(() => {
			try {
				core.export(core.image);
				ptl.hide();
			} catch (e) {
				Core.app.post(() => {
					ui.showError("Khởi tọa bản vẽ không thành công!", e);
					core.stage = "";
				});
			}
		}, "Bắt đầu làm việc!").start();
	}).disabled(() => !core.image || core.stage != "");

	core.build();
});
